import { state } from '../store/formState'
import { safePostOrQueue } from './queue'
import { OPTIONS } from '../options'
import { generatePdfSnapshot, generatePdfFileName } from './pdf'

function plain(obj){ return JSON.parse(JSON.stringify(obj)) }

const TYPES_CANON = [
  'plakety','chl','chl_pris','vh_hlavy','kohouty',
  'narazec','odkapniky','plyn','hadice_python','spojky',
  'sanitace','vh_prisl','drzaky_desky','izolace','pulty','ostatni'
]

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

function buildProductMap() {
  const map = {}
  Object.entries(OPTIONS).forEach(([type, items]) => {
    items.forEach(item => {
      if (item.value) map[item.value] = item.text || ''
    })
  })
  return map
}

function collectLineItems(json) {
  const rows = []
  const isDummyCode = (s) => {
    const v = (s ?? '').toString().trim().toLowerCase()
    return v === '' || v === '1' || v === 'true' || v === 'on' || v === 'yes' || v === '0' || v === 'na'
  }

  TYPES_CANON.forEach(type => {
    const arr = Array.isArray(json.sections?.[type]) ? json.sections[type] : (Array.isArray(json[type]) ? json[type] : [])
    arr.forEach(it => {
      const code = (it.value ?? it.code ?? '').toString().trim()
      const qtyNum = Number(it.qty ?? it.count ?? 0)
      if (Number.isFinite(qtyNum) && qtyNum > 0 && !isDummyCode(code)) {
        rows.push({ section: type, code, qty: qtyNum })
      }
    })
  })
  return rows
}

function csvEscapeField(value) {
  if (value === null || value === undefined) return '""'
  const s = value.toString()
  return '"' + s.replace(/"/g, '""') + '"'
}

export function generateCSV(json) {
  const meta = {
    SAP: json.header?.sapId || json.sapId || '',
    Provozovna: json.header?.nazevProvozovny || json.nazevProvozovny || '',
    Track: json.header?.cisloTracku || json.cisloTracku || '',
    Vyplnil: json.header?.vyplnilJmeno || json.vyplnilJmeno || '',
    Datum: json.header?.vyplnilDatum || json.vyplnilDatum || (new Date()).toISOString().split('T')[0]
  }

  const prodMap = buildProductMap()
  const items = collectLineItems(json)

  const delim = ';'
  const lines = []
  const joinVal = (v) => Array.isArray(v) ? v.join(' | ') : (v == null ? '' : v)
  const addKv = (label, value) => lines.push([label, value ?? ''].map(csvEscapeField).join(delim))

  // META
  lines.push(['SAP', 'Provozovna', 'Track', 'Vyplnil', 'Datum'].map(csvEscapeField).join(delim))
  lines.push([meta.SAP, meta.Provozovna, meta.Track, meta.Vyplnil, meta.Datum].map(csvEscapeField).join(delim))
  lines.push('')

  // UMISTENI
  const U = json.umisteni || {}
  lines.push(['[UMISTENI]','Hodnota'].map(csvEscapeField).join(delim))
  addKv('Ext. firma', U.ext_firma)
  addKv('KEG – umístění', joinVal(U.keg_umisteni))
  addKv('KEG – poznámka', U.keg_poznamka)
  addKv('CHL – umístění', joinVal(U.chl_umisteni))
  addKv('CHL – poznámka', U.chl_poznamka)
  addKv('Typ montáže', joinVal(U.typ_montaze))
  addKv('Pozn. montáže', U.typ_poznamka)
  addKv('Vzdálenost (km)', U.km)
  addKv('Počet techniků', U.pocet_techniku)
  addKv('Počet pivních vedení (K)', json.pivniVedeni)
  lines.push('')

  // DOHODY
  const D = json.dohody || {}
  lines.push(['[DOHODY]','Hodnota'].map(csvEscapeField).join(delim))
  addKv('Výčepní hlava – zásuvka', D.hlava_zasuvka)
  addKv('Výčepní hlava – prac. deska', D.hlava_pracdeska)
  addKv('Výčepní hlava – otvor', D.hlava_otvor)
  addKv('HLAVA – materiál (checkboxy)', joinVal(D.hlava_material))
  addKv('Materiál desky – jiný', D.hlava_material_jiny)
  addKv('CHL – zásuvka', D.chl_zasuvka)
  addKv('CHL – odvětrání', D.chl_odvetrani)
  addKv('CHL – podstavec', D.chl_podstavec)
  addKv('Sudy – voda', D.sudy_voda)
  addKv('Sudy – kulový ventil', D.sudy_kulovy)
  addKv('Sudy – tlak', D.sudy_tlak)
  addKv('Sudy – dochlazení', D.sudy_dochlazeni)
  addKv('Průrazy – stav', D.stav_prurazy)
  addKv('Chránička – stav', D.stav_chranicka)
  addKv('Lanko – stav', D.stav_lanko)
  addKv('Pokyny VT', D.pokyny_vt)
  addKv('Pozn. prostor CHL', D.chl_poznamka_dohody)
  addKv('Pozn. sudy', D.sudy_poznamka)
  addKv('Pozn. stavební připravenost', D.stav_poznamka)
  addKv('DOHODY – poznámka', D.dohody_poznamka)
  addKv('KOFOLA – položky', joinVal(json.kofola))
  addKv('KOFOLA – poznámka', json.kofola_poznamka)
  addKv('Demontáž VT – poznámky', json.demontaz_poznamky)
  lines.push('')

  // POZNAMKY
  lines.push(['[POZNAMKY_SEKCE]','Text'].map(csvEscapeField).join(delim))
  TYPES_CANON.forEach(t => {
    const note = json.notes?.[t] || json['pozn_' + t]
    if (note) addKv(t, note)
  })
  lines.push('')

  // POLOZKY
  lines.push(['SAP POLOŽKY', 'QTY (POČET)', 'NÁZEV', 'TYP POLOŽKY'].map(csvEscapeField).join(delim))
  items
    .filter(it => (it.code || '').trim() !== '' && (Number(it.qty) || 0) > 0)
    .forEach(it => {
      const name = prodMap[it.code] || ''
      lines.push([it.code, it.qty, name, it.section].map(csvEscapeField).join(delim))
    })

  const csv = '\uFEFF' + lines.join('\r\n')
  const base64 = btoa(unescape(encodeURIComponent(csv)))
  return { csvText: csv, base64 }
}

export async function sendToPA(){
  const jsonEndpoint = import.meta.env.VITE_PA_JSON_ENDPOINT
  const csvEndpoint = import.meta.env.VITE_PA_CSV_ENDPOINT

  if (!jsonEndpoint) throw new Error('VITE_PA_JSON_ENDPOINT není nastaveno')
  if (!csvEndpoint) throw new Error('VITE_PA_CSV_ENDPOINT není nastaveno')

  const { fileName, data } = buildPayload()

  // Generate PDF snapshot
  let pdfBase64 = ''
  let pdfFileName = generatePdfFileName(data)

  try {
    const pdfResult = await generatePdfSnapshot()
    pdfBase64 = pdfResult.pdfBase64
  } catch (err) {
    console.warn('PDF generation failed, continuing without PDF:', err)
  }

  // Přidej PDF do dat
  if (pdfBase64) {
    data.__pdfBase64 = pdfBase64
    data.__pdfFileName = pdfFileName
  }

  const jsonString = JSON.stringify(data)
  const jsonBase64 = btoa(unescape(encodeURIComponent(jsonString)))

  // JSON upload (včetně PDF)
  const jsonRes = await safePostOrQueue(jsonEndpoint, {
    jsonFileName: fileName,
    jsonContent: jsonBase64,
    __pdfBase64: pdfBase64,
    __pdfFileName: pdfFileName
  }, { 'Content-Type':'application/json' })

  // CSV upload
  const { base64: csvBase64 } = generateCSV(data)
  await safePostOrQueue(csvEndpoint, {
    csvFileName: fileName.replace(/\.json$/i, '.csv'),
    csvContent: csvBase64
  }, { 'Content-Type':'application/json' })

  return jsonRes
}