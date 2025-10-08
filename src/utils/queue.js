const QUEUE_KEY = 'TS_SEND_QUEUE_VUE_V1'


function getQueue(){
try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]') } catch { return [] }
}
function setQueue(q){
try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)) } catch {}
}
export function enqueue(task){
const q = getQueue(); q.push({ ...task, queuedAt: new Date().toISOString() }); setQueue(q)
}
export async function processQueue(){
if (!navigator.onLine) return
const q = getQueue(); if (!q.length) return
const remain = []
for (const t of q){ try { await trySend(t) } catch { remain.push(t) } }
setQueue(remain)
if (q.length && !remain.length) alert('Online – čekající položky byly odeslány.')
}
async function trySend({ url, body, headers }){
const resp = await fetch(url, { method:'POST', headers: headers||{ 'Content-Type':'application/json' }, body: JSON.stringify(body) })
if (!resp.ok) throw new Error('HTTP '+resp.status)
}
export async function safePostOrQueue(url, body, headers){
const doEnqueue = ()=>{ enqueue({ url, body, headers }); alert('Offline/výpadek – úloha frontována a po připojení odešlu.'); return { queued:true } }
if (!navigator.onLine) return doEnqueue()
try {
const resp = await fetch(url, { method:'POST', headers: headers||{ 'Content-Type':'application/json' }, body: JSON.stringify(body) })
if (!resp.ok) throw new Error('HTTP '+resp.status)
return { ok:true }
} catch { return doEnqueue() }
}
window.addEventListener('online', processQueue)