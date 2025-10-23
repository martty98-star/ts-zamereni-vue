<template>
  <div class="row dynamic-row">
    <div class="select-filter-wrap">
      <select v-model="model.value">
        <option value="">— vyber položku —</option>
        <option v-for="o in filteredOptions" :key="o.value" :value="o.value">{{ o.text }}</option>
      </select>
      <input
        v-model="filterQuery"
        class="select-filter"
        type="text"
        placeholder="Začni hledat…"
      />
      <div class="select-filter-tools">
        <button type="button" class="select-filter-reset" @click="resetFilter">Zrušit filtr</button>
        <span class="select-filter-count">{{ filteredOptions.length }}/{{ options.length }} položek</span>
      </div>
    </div>
    <input type="number" min="0" v-model.number="model.qty" class="qty-input" />
    <button type="button" class="icon-btn" @click="$emit('delete')">🗑</button>
  </div>
</template>

<script setup>
import { reactive, watch, ref, computed } from 'vue'

const props = defineProps({ modelValue: Object, options: Array })
const emit = defineEmits(['update:modelValue', 'delete'])

const model = reactive({
  value: props.modelValue?.value || '',
  qty: props.modelValue?.qty || 1
})

const filterQuery = ref('')

// Normalizace pro vyhledávání (bez diakritiky)
const normalize = (str) => {
  if (!str) return ''
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

const filteredOptions = computed(() => {
  if (!filterQuery.value) return props.options || []
  const q = normalize(filterQuery.value)
  return (props.options || []).filter(o => {
    return normalize(o.text).includes(q) || normalize(o.value).includes(q)
  })
})

const resetFilter = () => {
  filterQuery.value = ''
}

watch(model, v => emit('update:modelValue', v), { deep: true })
</script>
