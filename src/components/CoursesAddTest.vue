<script setup>
import { computed } from 'vue'
import ModalBox from '@/components/ModalBox.vue'
import { useStore } from 'vuex'
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  }
})
const store = useStore()

const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const confirm = async () => {
  await store.dispatch('addTestCourses')
}
</script>

<template>
  <modal-box
    v-model="value"
    title="Add test courses"
    button-label="Confirm"
    has-cancel
    @confirm="confirm"
  >
    <p>
      This will add test course data to your school. Do you want to proceed?
    </p>
  </modal-box>
</template>
