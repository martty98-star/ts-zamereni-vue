let timer = null
const LS_KEY = 'TS_FORM_DRAFT_VUE'


export function loadDraft() {
try {
const raw = localStorage.getItem(LS_KEY)
if (!raw) return null
const parsed = JSON.parse(raw)
return parsed?.data ?? null
} catch { return null }
}


export function clearDraft() {
try { localStorage.removeItem(LS_KEY) } catch {}
}


export function saveDraftDebounced(obj) {
if (timer) clearTimeout(timer)
timer = setTimeout(() => {
try {
const payload = { savedAt: new Date().toISOString(), data: toPlain(obj) }
localStorage.setItem(LS_KEY, JSON.stringify(payload))
} catch {}
}, 400)
}


function toPlain(val) {
return JSON.parse(JSON.stringify(val))
}