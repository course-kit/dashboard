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
  if (props.id) {
    const student = store.getters.getStudentById(props.id)
    return student ? student.name : null
  }
  return null
})
const course = computed(() => {
  if (props.id) {
    const student = store.getters.getStudentById(props.id)
    const courseId = student ? student.course : null
    if (courseId) {
      const course = store.getters.getCourseById(courseId)
      return course ? course.title : null
    }
  }
  return null
})

const emit = defineEmits(['update:modelValue', 'confirm'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const confirm = async () => {
  await store.dispatch('studentDelete', props.id)
  emit('confirm')
}
</script>

<template>
  <modal-box
    v-model="value"
    title="Remove student from course"
    button-label="Confirm"
    has-cancel
    @confirm="confirm"
  >
    <p>
      Are you sure you wish to remove <strong>{{ title }}</strong> from
      <strong>{{ course }}</strong>? This cannot be reversed.
    </p>
  </modal-box>
</template>
