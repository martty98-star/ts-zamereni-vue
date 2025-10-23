<template>
  <main id="formWrapper">
    <FormHeader />
    <Umisteni />

    <!-- CHLADIČE -->
    <DynamicSection type="chl" title="CHLADIČE" />

    <!-- PŘÍSLUŠENSTVÍ CHLADIČŮ -->
    <DynamicSection type="chl_pris" title="PŘÍSLUŠENSTVÍ CHLADIČŮ" />

    <!-- VH HLAVY -->
    <div class="section" id="vh_hlavySection">
      <h2>VÝČEPNÍ HLAVY (VH) + KRYTY</h2>
      <div class="rows">
        <SelectRow
          v-for="(row, i) in s.sections.vh_hlavy"
          :key="i"
          v-model="s.sections.vh_hlavy[i]"
          :options="OPTIONS.vh_hlavy"
          @delete="removeRow('vh_hlavy', i)"
        />
      </div>
      <div class="controls">
        <button class="primary" type="button" @click="addRow('vh_hlavy')">+ Přidat VH/kryt</button>
      </div>
      <div style="margin-top:1rem;">
        <label for="pivniVedeni">Počet pivních vedení (K)</label>
        <select v-model="s.pivniVedeni" @change="handlePivniVedeniChange">
          <option value="">-- vyber počet --</option>
          <option value="1">1K</option>
          <option value="2">2K</option>
          <option value="3">3K</option>
          <option value="4">4K</option>
          <option value="5">5K</option>
          <option value="6">6K</option>
          <option value="8">8K</option>
        </select>
      </div>
      <textarea class="note-field" v-model="s.notes.vh_hlavy" placeholder="Poznámka k výčepním hlavám a krytům"></textarea>
    </div>

    <!-- SPOJKY -->
    <DynamicSection type="spojky" title="SPOJKY" />

    <!-- PLAKETY -->
    <DynamicSection type="plakety" title="PLAKETY" />

    <!-- KOHOUTY -->
    <DynamicSection type="kohouty" title="VÝČEPNÍ KOHOUTY" />

    <!-- NARAŽEČE & DÍLY -->
    <DynamicSection type="narazec" title="NARAŽEČE & DÍLY" />

    <!-- ODKAPNÍKY & OSTŘIK -->
    <DynamicSection type="odkapniky" title="ODKAPNÍKY & OSTŘIK" />

    <!-- PLYN CO₂ / N₂ -->
    <DynamicSection type="plyn" title="PLYN CO₂ / N₂" />

    <!-- HADICE & PYTHON -->
    <DynamicSection type="hadice_python" title="HADICE & PYTHON" />

    <!-- SANITACE & BALÍČKY -->
    <DynamicSection type="sanitace" title="SANITACE & BALÍČKY" />

    <!-- VH PŘÍSLUŠENSTVÍ -->
    <DynamicSection type="vh_prisl" title="VH PŘÍSLUŠENSTVÍ (držáky, mezikruží)" />

    <!-- DESKY & DRŽÁKY -->
    <DynamicSection type="drzaky_desky" title="DESKY & DRŽÁKY" />

    <!-- IZOLACE -->
    <DynamicSection type="izolace" title="IZOLACE" />

    <!-- PULTY -->
    <DynamicSection type="pulty" title="PULTY & MINIBOXY" />

    <!-- OSTATNÍ -->
    <DynamicSection type="ostatni" title="OSTATNÍ" />

    <!-- DOHODY A JINÁ UJEDNÁNÍ -->
    <Dohody />

    <!-- VYPLNIL DOTAZNÍK -->
    <VyplnilSection />

    <!-- TLAČÍTKA -->
    <div class="button-row">
      <button class="primary" type="button" @click="handleSave">💾 Uložit dotazník</button>
      <button class="ghost" type="button" @click="triggerLoadJson">📂 Načíst dotazník</button>
      <input ref="jsonInput" type="file" accept=".json" style="display:none" @change="handleLoadJson" />
    </div>

    <div class="notice"></div>
  </main>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { state as s, touch } from '../store/formState'
import { OPTIONS } from '../options'
import { sendToPA } from '../utils/exporters'
import { clearDraft } from '../utils/storage'

import FormHeader from '../components/FormHeader.vue'
import Umisteni from '../components/Umisteni.vue'
import Dohody from '../components/Dohody.vue'
import VyplnilSection from '../components/VyplnilSection.vue'
import DynamicSection from '../components/DynamicSection.vue'
import SelectRow from '../components/SelectRow.vue'

const jsonInput = ref(null)

// Ensure vh_hlavy has at least one empty row on mount
onMounted(() => {
  if (!s.sections.vh_hlavy || s.sections.vh_hlavy.length === 0) {
    s.sections.vh_hlavy = [{ value: '', qty: 1 }]
  }
})

// Auto-fill spojky podle počtu pivních vedení
const spojkyTabulka = {
  1: { "PN580003132": 7, "PN580003227": 1, "PN580003143": 3 },
  2: { "PN580003132": 8, "PN580003227": 2, "PN580003143": 4 },
  3: { "PN580003132": 11, "PN580003227": 3, "PN580003143": 5 },
  4: { "PN580003132": 14, "PN580003227": 4, "PN580003143": 6 },
  5: { "PN580003132": 17, "PN580003227": 5, "PN580003143": 7 },
  6: { "PN580003132": 20, "PN580003227": 6, "PN580003143": 8 },
  8: { "PN580003132": 28, "PN580003227": 8, "PN580003143": 12 }
}

function handlePivniVedeniChange() {
  const count = parseInt(s.pivniVedeni, 10)
  if (!spojkyTabulka[count]) return

  const items = spojkyTabulka[count]
  s.sections.spojky = []
  Object.entries(items).forEach(([code, qty]) => {
    s.sections.spojky.push({ value: code, qty })
  })
  touch()
}

function addRow(type) {
  if (!s.sections[type]) s.sections[type] = []
  s.sections[type].push({ value: '', qty: 1 })
  touch()
}

function removeRow(type, index) {
  s.sections[type].splice(index, 1)
  touch()
}

async function handleSave() {
  try {
    const res = await sendToPA()
    if (res && res.ok) {
      alert('Soubor JSON a CSV byl odeslán do Power Automate.')
      clearDraft()
    }
  } catch (err) {
    alert('Chyba při ukládání: ' + (err.message || err))
  }
}

function triggerLoadJson() {
  jsonInput.value?.click()
}

function handleLoadJson(event) {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result)
      hydrateForm(data)

      const ts = new Date().toISOString().replace(/[:.]/g, '-')
      s.__jsonReloaded = true
      s.__jsonReloadedTimestamp = ts

      alert(`Data načtena.\nNavržený nový název: ${data.sapId}_${data.nazevProvozovny}_..._EDITOVANO_${ts}.json`)
      touch()
    } catch (err) {
      alert('Chyba při načítání JSON: ' + err.message)
    }
  }
  reader.readAsText(file)
}

function hydrateForm(data) {
  if (!data) return

  // Header
  if (data.header) {
    Object.assign(s.header, data.header)
  } else {
    // Fallback pro starý formát
    ['sapId', 'nazevProvozovny', 'cisloTracku', 'pozadovanyDatum', 'adresaProvozovny', 'kontakt', 'vyplnilJmeno', 'vyplnilDatum'].forEach(k => {
      if (data[k] !== undefined) s.header[k] = data[k]
    })
  }

  // Umístění
  if (data.umisteni) {
    Object.assign(s.umisteni, data.umisteni)
  }

  // Dohody
  if (data.dohody) {
    Object.assign(s.dohody, data.dohody)
  }

  // Top-level pole
  if (data.pivniVedeni !== undefined) s.pivniVedeni = data.pivniVedeni
  if (data.kofola) s.kofola = Array.isArray(data.kofola) ? data.kofola : []
  if (data.kofola_poznamka !== undefined) s.kofola_poznamka = data.kofola_poznamka
  if (data.demontaz_poznamky !== undefined) s.demontaz_poznamky = data.demontaz_poznamky

  // Dynamické sekce - načtení položek
  const types = ['plakety', 'chl', 'chl_pris', 'vh_hlavy', 'spojky', 'kohouty', 'narazec', 'odkapniky', 'plyn', 'hadice_python', 'sanitace', 'vh_prisl', 'drzaky_desky', 'izolace', 'pulty', 'ostatni']
  types.forEach(type => {
    // Reset sekce
    s.sections[type] = []

    // Načti data
    let items = []
    if (Array.isArray(data[type])) {
      items = data[type]
    } else if (data.sections && Array.isArray(data.sections[type])) {
      items = data.sections[type]
    }

    // Naplň sekci
    s.sections[type] = items.map(item => ({
      value: item.value ?? item.code ?? '',
      qty: item.qty ?? item.count ?? 1
    }))

    // Načti poznámku pro tuto sekci
    s.notes[type] = ''
    const noteKey = 'pozn_' + type
    if (data[noteKey] !== undefined) {
      s.notes[type] = data[noteKey]
    } else if (data.notes && data.notes[type] !== undefined) {
      s.notes[type] = data.notes[type]
    }
  })
}

// Auto-save
watch(s, touch, { deep: true })
</script>
