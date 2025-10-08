<template>
  <div class="section">
    <h2>{{ title }}</h2>
    <div>
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
  </div>
</template>

<script setup>
import { watch, computed } from 'vue'
import { state as s, touch } from '../store/formState'
import { OPTIONS } from '../options'
import SelectRow from './SelectRow.vue'

const props = defineProps({ type: String, title: String })

const list = computed({
  get: () => s.sections[props.type],
  set: v => { s.sections[props.type] = v; touch() }
})

const opts = computed(() => OPTIONS[props.type] || [])
function add() { list.value = [...list.value, { value: '', qty: 1 }] }
function remove(i) { list.value = list.value.filter((_, idx) => idx !== i) }

watch(list, touch, { deep: true })
</script>
