<template>
<div class="section">
<h2>{{ title }}</h2>
<div>
<SelectRow v-for="(row, i) in list" :key="i" v-model="list[i]" :options="opts" @delete="remove(i)" />
</div>
<div class="controls">
<button class="primary" type="button" @click="add">+ Přidat položku</button>
</div>
<textarea class="note-field" v-model="note" :placeholder="`Poznámka k ${title.toLowerCase()}`" />
</div>
</template>
<script setup>
import { computed } from 'vue'
import { state as s, touch } from '../store/formState'
import { OPTIONS } from '../options'
import SelectRow from './SelectRow.vue'


const props = defineProps({ type: { type: String, required: true }, title: { type: String, required: true } })
const list = computed({
get: () => s.sections[props.type],
set: v => { s.sections[props.type] = v; touch() }
})
const note = computed({
get: () => s.notes[props.type] ?? '',
set: v => { s.notes[props.type] = v; touch() }
})
const opts = computed(() => OPTIONS[props.type] || [])
function add(){ list.value = [...list.value, { value:'', qty:1 }] }
function remove(i){ list.value = list.value.filter((_,idx)=> idx!==i) }
watch(list, touch, { deep: true })
</script>
<style scoped>
.section{ background:#fff; padding:1.2rem; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,.06); margin-bottom:1rem }
.controls{ display:flex; justify-content:flex-end; margin-top:.6rem }
.note-field{ margin-top:.8rem; height:60px; resize:vertical; width:100% }
.primary{ background:#b99742; color:#fff; padding:.55rem .9rem; border-radius:8px }
</style>