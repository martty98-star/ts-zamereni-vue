<template>
  <div class="section">
    <h2>{{ title }}</h2>
    <div class="rows">
      <SelectRow
        v-for="(row, i) in list"
        :key="i"
        v-model="list[i]"
        :options="opts"
        @delete="remove(i)"
      />
    </div>
    <div class="controls">
      <button class="primary" type="button" @click="add">+ Přidat položku</button>
    </div>
    <textarea
      class="note-field"
      v-model="note"
      :placeholder="`Poznámka k ${title.toLowerCase()}`"
    ></textarea>
  </div>
</template>

<script setup>
import { watch, computed, onMounted } from 'vue'
import { state as s, touch } from '../store/formState'
import { OPTIONS } from '../options'
import SelectRow from './SelectRow.vue'

const props = defineProps({ type: String, title: String })

const list = computed({
  get: () => {
    const items = s.sections[props.type]
    // Zajisti alespoň jeden prázdný řádek
    if (!items || items.length === 0) {
      return [{ value: '', qty: 1 }]
    }
    return items
  },
  set: v => { s.sections[props.type] = v; touch() }
})

const note = computed({
  get: () => s.notes[props.type],
  set: v => { s.notes[props.type] = v; touch() }
})

const opts = computed(() => OPTIONS[props.type] || [])
function add() { list.value = [...list.value, { value: '', qty: 1 }] }
function remove(i) { list.value = list.value.filter((_, idx) => idx !== i) }

// Při prvním načtení zajisti alespoň jeden řádek
onMounted(() => {
  if (!s.sections[props.type] || s.sections[props.type].length === 0) {
    s.sections[props.type] = [{ value: '', qty: 1 }]
  }
})

watch(list, touch, { deep: true })
watch(note, touch)
</script>
