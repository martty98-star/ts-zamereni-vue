<template>
  <div class="row dynamic-row">
    <select v-model="model.value">
      <option value="">— vyber položku —</option>
      <option v-for="o in options" :key="o.value" :value="o.value">{{ o.text }}</option>
    </select>
    <input type="number" min="0" v-model="model.qty" />
    <button type="button" class="icon-btn" @click="$emit('delete')">🗑</button>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
const props = defineProps({ modelValue: Object, options: Array })
const emit = defineEmits(['update:modelValue', 'delete'])
const model = reactive({ value: props.modelValue?.value || '', qty: props.modelValue?.qty || 1 })
watch(model, v => emit('update:modelValue', v), { deep: true })
</script>
