import plakety from './plakety'


// Registry všech typů -> pole položek [ { value, text } ]
// Postupně doplň podle původních <template data-type="...">
export const OPTIONS = {
plakety,
chl: [], chl_pris: [], vh_hlavy: [], spojky: [], kohouty: [],
narazec: [], odkapniky: [], plyn: [], hadice_python: [], sanitace: [],
vh_prisl: [], drzaky_desky: [], izolace: [], pulty: [], ostatni: []
}


export function firstValue(type){
const arr = OPTIONS[type] || []
const first = arr.find(o => String(o.value||'').trim() !== '')
return first ? first.value : ''
}