<template>
<div class="section">
<h2>Hlavička</h2>
<div class="grid">
<div>
<label>SAP ID</label>
<input v-model="s.header.sapId" inputmode="numeric" placeholder="Zadej SAP ID nebo IČO" />
</div>
<div>
<label>Název provozovny</label>
<input v-model="s.header.nazevProvozovny" placeholder="Zadej název provozovny" />
</div>
<div>
<label>Adresa provozovny</label>
<input v-model="s.header.adresaProvozovny" placeholder="Zadej adresu" />
</div>
<div>
<label>Číslo TRACKu</label>
<input v-model="s.header.cisloTracku" inputmode="numeric" placeholder="Zadej číslo TRACKu" />
</div>
<div>
<label>Požadovaný datum instalace</label>
<input v-model="s.header.pozadovanyDatum" />
</div>
<div>
<label>ZÁK. JMÉNO + KONTAKT</label>
<input v-model="s.header.kontakt" />
</div>
</div>
</div>
</template>
<script setup>
import { state as s, touch } from '../store/formState'
watch(s, touch, { deep: true })
</script>
<style scoped>
.grid{ display:grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap:.8rem 1rem }
.section{ background:#fff; padding:1.2rem; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,.06); margin-bottom:1rem }
label{ font-weight:600; color:#333; display:block; margin-bottom:.35rem }
input{ width:100%; padding:.55rem .6rem; border:1px solid #ccc; border-radius:6px }
</style>