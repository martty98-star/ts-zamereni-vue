<template>
<div class="section">
<h2>Umístění a montáž</h2>
<div class="row">
<label>Bude instalovat externí firma?</label>
<div class="opts">
<label><input type="radio" value="ANO" v-model="s.umisteni.ext_firma"> ANO</label>
<label><input type="radio" value="NE" v-model="s.umisteni.ext_firma"> NE</label>
</div>
</div>


<div class="row">
<label>Umístění KEG</label>
<div>
<div class="opts">
<label><input type="checkbox" value="pod_stolem" v-model="s.umisteni.keg_umisteni"> Pod stolem</label>
<label><input type="checkbox" value="mistnost" v-model="s.umisteni.keg_umisteni"> Místnost</label>
<label><input type="checkbox" value="box" v-model="s.umisteni.keg_umisteni"> Box</label>
</div>
<input v-model="s.umisteni.keg_poznamka" placeholder="poznámka k umístění KEG" />
</div>
</div>


<!-- Analogicky: chl_umisteni, typ_montaze, km, pocet_techniku -->
</div>
</template>
<script setup>
import { state as s, touch } from '../store/formState'
watch(s, touch, { deep: true })
</script>
<style scoped>
.section{ background:#fff; padding:1.2rem; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,.06); margin-bottom:1rem }
.row{ display:grid; grid-template-columns:280px 1fr; gap:1.2rem; align-items:start; margin-bottom:1rem }
.opts{ display:flex; gap:.8rem 1.2rem; flex-wrap:wrap }
input{ width:100%; padding:.5rem .65rem; border:1px solid #ccc; border-radius:6px }
</style>