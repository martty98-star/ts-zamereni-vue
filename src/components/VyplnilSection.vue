<template>
  <div class="section" id="vyplnilSection">
    <h2>VYPLNIL DOTAZNÍK</h2>
    <div class="grid">
      <div>
        <label for="vyplnilJmeno">Jméno / kdo vyplnil</label>
        <input v-model="s.header.vyplnilJmeno" type="text" placeholder="Zadej jméno" />
      </div>
      <div>
        <label for="vyplnilDatum">Datum vyplnění</label>
        <input v-model="s.header.vyplnilDatum" type="date" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { state as s, touch } from '../store/formState'
watch(s, touch, { deep: true })
</script>
