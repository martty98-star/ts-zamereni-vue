<template>
<div class="row">
<select v-model="model.value">
<option value="">— vyber položku —</option>
<option v-for="o in options" :key="o.value" :value="o.value">{{ o.text }}</option>
</select>
<input type="number" min="0" v-model="model.qty">
<button type="button" class="icon-btn" @click="$emit('delete')">🗑</button>
</div>
</template>
<script setup>
const props = defineProps({ modelValue: { type: Object, required: true }, options: { type: Array, default: () => [] } })
const emit = defineEmits(['update:modelValue','delete'])
const model = reactive({ value: props.modelValue.value || '', qty: props.modelValue.qty || 1 })
watch(model, v => emit('update:modelValue', v), { deep: true })
</script>
<style scoped>
.row{ display:grid; grid-template-columns: 1fr 100px 40px; gap:.6rem; align-items:center }
select, input{ height:40px }
.icon-btn{ height:40px; border-radius:8px }
</style>