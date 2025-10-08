<template>
<main>
<small class="subtle">Tento formulář slouží jako zaměřovací list. Data se ukládají offline. Případné dotazy: Martin Krbec.</small>
<FormHeader />
<Umisteni />


<DynamicSection type="chl" title="Chladiče" />
<DynamicSection type="chl_pris" title="Příslušenství chladičů" />
<DynamicSection type="vh_hlavy" title="Výčepní hlavy (VH) + kryty" />
<DynamicSection type="spojky" title="Spojky" />
<DynamicSection type="plakety" title="Plakety" />
<DynamicSection type="kohouty" title="Výčepní kohouty" />
<DynamicSection type="narazec" title="Naražeče & díly" />
<DynamicSection type="odkapniky" title="Odkapníky & ostřik" />
<DynamicSection type="plyn" title="Plyn CO₂ / N₂" />
<DynamicSection type="hadice_python" title="Hadice & python" />
<DynamicSection type="sanitace" title="Sanitace & balíčky" />
<DynamicSection type="vh_prisl" title="VH příslušenství (držáky, mezikruží)" />
<DynamicSection type="drzaky_desky" title="Desky & držáky" />
<DynamicSection type="izolace" title="Izolace" />
<DynamicSection type="pulty" title="Pulty & miniboxy" />
<DynamicSection type="ostatni" title="Ostatní" />


<div class="button-row">
<button class="primary" @click="save">💾 Uložit (JSON + CSV → Power Automate)</button>
<button class="ghost" @click="resetAll">🗑️ Zahodit koncept</button>
</div>
</main>
</template>
<script setup>
import FormHeader from './components/FormHeader.vue'
import Umisteni from './components/Umisteni.vue'
import DynamicSection from './components/DynamicSection.vue'
import { resetAll } from './store/formState'
import { sendToPA } from './utils/exporters'


async function save(){
try{ const res = await sendToPA(); if(res?.ok) { alert('Odesláno do Power Automate.'); resetAll() } }
catch(e){ alert('Odeslání selhalo – úloha byla frontována nebo znovu zkuste. '+(e?.message||e)) }
}
</script>
<style scoped>
main{ padding:1rem; background:#f5f5f5 }
.small{ color:#666 }
.button-row{ display:flex; gap:.8rem; justify-content:center; flex-wrap:wrap; margin:1.2rem 0 }
.primary{ background:#b99742; color:#fff; padding:.55rem .9rem; border-radius:8px; border:none }
.ghost{ background:#f0f0f0; color:#333; padding:.55rem .9rem; border-radius:8px; border:none }
</style>