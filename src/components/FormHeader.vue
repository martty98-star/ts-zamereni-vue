<template>
  <div>
    <small class="subtle">Tento formulář slouží jako zaměřovací list. Formuláře se dají znovu editovat a data uložit offline. V případě dotazů, problémů či zlepšení volejte Martina Krbce 735 189 416</small>

    <div class="form-header">
      <div class="grid">
        <div>
          <label for="sapId">SAP ID</label>
          <input v-model="s.header.sapId" inputmode="numeric" placeholder="Zadej SAP ID nebo IČO" type="text" />
        </div>
        <div>
          <label for="nazevProvozovny">NÁZEV PROVOZOVNY</label>
          <input v-model="s.header.nazevProvozovny" placeholder="Zadej název provozovny" type="text" />
        </div>
        <div>
          <label for="adresaProvozovny">ADRESA PROVOZOVNY</label>
          <input v-model="s.header.adresaProvozovny" placeholder="Zadej adresu provozovny" type="text" />
        </div>
        <div>
          <label for="cisloTracku">ČÍSLO TRACKU</label>
          <input v-model="s.header.cisloTracku" inputmode="numeric" placeholder="Zadej číslo TRACKu" type="text" />
        </div>
        <div>
          <label for="pozadovanyDatum">POŽADOVANÝ DATUM INSTALACE</label>
          <input v-model="s.header.pozadovanyDatum" type="text" />
        </div>
        <div>
          <label for="kontakt">ZÁK. JMÉNO + KONTAKT</label>
          <input v-model="s.header.kontakt" type="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { state as s, touch } from '../store/formState'
watch(s, touch, { deep: true })
</script>
