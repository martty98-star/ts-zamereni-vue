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
hlava_material: [], hlava_material_jiny: '',
chl_zasuvka: '', chl_odvetrani: '', chl_podstavec: '',
chl_poznamka_dohody: '',
sudy_voda: '', sudy_kulovy: '', sudy_tlak: '', sudy_dochlazeni: '',
sudy_poznamka: '',
stav_prurazy: '', stav_chranicka: '', stav_lanko: '',
stav_poznamka: '',
dohody_poznamka: '', pokyny_vt: ''
},
pivniVedeni: '',
kofola: [],
kofola_poznamka: '',
demontaz_poznamky: '',
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