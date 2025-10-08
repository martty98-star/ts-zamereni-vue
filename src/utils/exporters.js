import { state } from '../store/formState'
import { safePostOrQueue } from './queue'


function plain(obj){ return JSON.parse(JSON.stringify(obj)) }


export function buildPayload(){
const d = plain(state)
const { header } = d
const sap = header.sapId || 'SAP'
const prov = (header.nazevProvozovny || 'PROVOZOVNA').replace(/\s+/g,'_')
const track = header.cisloTracku || 'TRACK'
const vyplnil = (header.vyplnilJmeno || 'NEURCENO').replace(/\s+/g,'_')


const editedAtISO = new Date().toISOString()
const technikVal = header.vyplnilJmeno || 'NEURCENO'
const base = { ...d, editedAt: editedAtISO, technik: technikVal }


let fileName = `${sap}_${prov}_${track}_${vyplnil}.json`
if (d.__jsonReloaded){
const ts = d.__jsonReloadedTimestamp || editedAtISO.replace(/[:.]/g,'-')
fileName = `${sap}_${prov}_${track}_EDITOVANO_${ts}.json`
base.__editedSuffix = `_EDITOVANO_${ts}`
}
return { fileName, data: base }
}


export function toCSVRows(data){
// Jednoduchý CSV flatten pro sekce: type;value;qty
const rows = [['type','value','qty']]
const secs = data.sections || {}
for (const [type, arr] of Object.entries(secs)){
(arr||[]).forEach(item=> rows.push([type, item.value||'', item.qty||'']))
}
return rows
}


export function asCSVString(rows){
return rows.map(r => r.map(cell => '"'+String(cell).replaceAll('"','""')+'"').join(';')).join('\n')
}


export async function sendToPA(){
const endpoint = import.meta.env.VITE_PA_ENDPOINT
if (!endpoint) throw new Error('VITE_PA_ENDPOINT není nastaveno')
const { fileName, data } = buildPayload()
const jsonString = JSON.stringify(data)
const jsonBase64 = btoa(unescape(encodeURIComponent(jsonString)))


const jsonRes = await safePostOrQueue(endpoint, { jsonFileName: fileName, jsonContent: jsonBase64 }, { 'Content-Type':'application/json' })


// CSV upload (volitelné – pokud máš separátní endpoint, uprav zde)
const csv = asCSVString(toCSVRows(data))
const csvBase64 = btoa(unescape(encodeURIComponent(csv)))
await safePostOrQueue(endpoint, { csvFileName: fileName.replace(/\.json$/i, '.csv'), csvContent: csvBase64 }, { 'Content-Type':'application/json' })


return jsonRes
}