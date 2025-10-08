<template>
  <div class="section">
    <h2>Umístění a montáž</h2>
    <div class="row">
      <label>Bude instalovat externí firma?</label>
      <div class="opts">
        <label><input type="radio" value="ANO" v-model="s.umisteni.ext_firma" /> ANO</label>
        <label><input type="radio" value="NE" v-model="s.umisteni.ext_firma" /> NE</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { state as s, touch } from '../store/formState'
watch(s, touch, { deep: true })
</script>
