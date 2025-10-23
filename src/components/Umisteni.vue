<template>
  <div class="section" id="umisteniSection">
    <h2>Umístění a montáž</h2>
    <div class="row">
      <label>Bude instalovat externí firma?</label>
      <div>
        <label><input type="radio" value="ANO" v-model="s.umisteni.ext_firma" /> ANO</label>
        <label><input type="radio" value="NE" v-model="s.umisteni.ext_firma" /> NE</label>
      </div>
    </div>
    <div class="row">
      <label>Umístění KEG</label>
      <div>
        <div class="opts">
          <label><input type="checkbox" value="pod_stolem" v-model="s.umisteni.keg_umisteni" /> Pod stolem</label>
          <label><input type="checkbox" value="mistnost" v-model="s.umisteni.keg_umisteni" /> Místnost</label>
          <label><input type="checkbox" value="box" v-model="s.umisteni.keg_umisteni" /> Box</label>
        </div>
        <input type="text" v-model="s.umisteni.keg_poznamka" placeholder="poznámka k umístění KEG" />
      </div>
    </div>
    <div class="row">
      <label>Umístění chladiče</label>
      <div>
        <div class="opts">
          <label><input type="checkbox" value="pod_stolem" v-model="s.umisteni.chl_umisteni" /> Pod stolem</label>
          <label><input type="checkbox" value="mistnost" v-model="s.umisteni.chl_umisteni" /> Místnost</label>
          <label><input type="checkbox" value="sklep" v-model="s.umisteni.chl_umisteni" /> Sklep</label>
          <label><input type="checkbox" value="prenoska" v-model="s.umisteni.chl_umisteni" /> Přenosný chladič</label>
        </div>
        <input type="text" v-model="s.umisteni.chl_poznamka" placeholder="poznámka k umístění chladiče" />
      </div>
    </div>
    <div class="row">
      <label>Typ montáže</label>
      <div>
        <div class="opts">
          <label><input type="checkbox" value="nova" v-model="s.umisteni.typ_montaze" /> Nová</label>
          <label><input type="checkbox" value="rozsireni" v-model="s.umisteni.typ_montaze" /> Rozšíření</label>
          <label><input type="checkbox" value="prestavba" v-model="s.umisteni.typ_montaze" /> Přestavba</label>
        </div>
        <div class="opts">
          <label><input type="checkbox" value="mala" v-model="s.umisteni.typ_montaze" /> Malá</label>
          <label><input type="checkbox" value="velka" v-model="s.umisteni.typ_montaze" /> Velká</label>
        </div>
        <input type="text" v-model="s.umisteni.typ_poznamka" placeholder="poznámka k typu montáže" />
      </div>
    </div>
    <div class="row">
      <label>Vzdálenost (Km)</label>
      <div>
        <label><input type="radio" value="do50" v-model="s.umisteni.km" /> do 50</label>
        <label><input type="radio" value="50-100" v-model="s.umisteni.km" /> 50–100</label>
        <label><input type="radio" value="100plus" v-model="s.umisteni.km" /> 100+</label>
      </div>
    </div>
    <div class="row">
      <label>Počet techniků</label>
      <div>
        <input type="text" inputmode="numeric" v-model="s.umisteni.pocet_techniku" placeholder="počet techniků" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { state as s, touch } from '../store/formState'
watch(s, touch, { deep: true })
</script>
