import { reactive } from 'vue'
import { loadDraft, saveDraftDebounced, clearDraft } from '../utils/storage'


const defaultState = () => ({
header: {
sapId: '', nazevProvozovny: '', adresaProvozovny: '',
cisloTracku: '', pozadovanyDatum: '', kontakt: '',
vyplnilJmeno: '', vyplnilDatum: ''
},
umisteni: {
ext_firma: '',
keg_umisteni: [], keg_poznamka: '',
chl_umisteni: [], chl_poznamka: '',
typ_montaze: [], typ_poznamka: '',
km: '', pocet_techniku: ''
},
dohody: {
hlava_zasuvka: '', hlava_pracdeska: '', hlava_otvor: '',
hlava_material: [],
chl_zasuvka: '', chl_odvetrani: '', chl_podstavec: '',
sudy_voda: '', sudy_kulovy: '', sudy_tlak: '', sudy_dochlazeni: '',
stav_prurazy: '', stav_chranicka: '', stav_lanko: '',
dohody_poznamka: '', pokyny_vt: ''
},
// dynamické sekce – každá je pole { value, qty }
sections: {
plakety: [], chl: [], chl_pris: [], vh_hlavy: [],
spojky: [], kohouty: [], narazec: [], odkapniky: [], plyn: [],
hadice_python: [], sanitace: [], vh_prisl: [], drzaky_desky: [],
izolace: [], pulty: [], ostatni: []
},
// notes pro sekce
notes: {
plakety: '', chl: '', chl_pris: '', vh_hlavy: '', spojky: '', kohouty: '',
narazec: '', odkapniky: '', plyn: '', hadice_python: '', sanitace: '',
vh_prisl: '', drzaky_desky: '', izolace: '', pulty: '', ostatni: ''
},
__jsonReloaded: false,
__jsonReloadedTimestamp: ''
})


export const state = reactive(loadDraft() ?? defaultState())


export function touch() {
saveDraftDebounced(state)
}


export function resetAll() {
clearDraft()
const fresh = defaultState()
Object.keys(state).forEach(k => state[k] = fresh[k])
}