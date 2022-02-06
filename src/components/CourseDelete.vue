<script setup>
import { computed } from 'vue'
import ModalBox from '@/components/ModalBox.vue'
import { useStore } from 'vuex'
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  id: {
    type: String,
    default: null
  }
})
const store = useStore()
const title = computed(() => {
  return props.id ? store.getters.getCourseById(props.id).title : null
})

const emit = defineEmits(['update:modelValue', 'confirm'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const confirm = async () => {
  await store.dispatch('courseDelete', props.id)
  emit('confirm')
}
</script>

<template>
  <modal-box
    v-model="value"
    title="Delete course"
    button-label="Confirm"
    has-cancel
    @confirm="confirm"
  >
    <p>
      Are you sure you wish to delete the course <strong>{{ title }}</strong>? This cannot be reversed.
    </p>
  </modal-box>
</template>
