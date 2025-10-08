<template>
  <div class="section">
    <h2>Hlavička</h2>
    <div class="grid">
      <div>
        <label>SAP ID</label>
        <input v-model="s.header.sapId" placeholder="Zadej SAP ID" />
      </div>
      <div>
        <label>Název provozovny</label>
        <input v-model="s.header.nazevProvozovny" />
      </div>
      <div>
        <label>Adresa provozovny</label>
        <input v-model="s.header.adresaProvozovny" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { state as s, touch } from '../store/formState'
watch(s, touch, { deep: true })
</script>
