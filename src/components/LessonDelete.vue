<script setup>
import { computed } from 'vue'
import ModalBox from '@/components/ModalBox.vue'
import { useStore } from 'vuex'
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  courseId: {
    type: String,
    default: null
  },
  lessonId: {
    type: String,
    default: null
  }
})
const store = useStore()
const lesson = computed(() => {
  return props.courseId && props.lessonId
    ? store.getters.getLessonById(props.courseId, props.lessonId)
    : null
})
const title = computed(() => {
  return lesson.value ? lesson.value.title : ''
})

const emit = defineEmits(['update:modelValue', 'confirm'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const confirm = async () => {
  await store.dispatch('lessonDelete', {
    courseId: props.courseId,
    lessonId: props.lessonId
  })
  emit('confirm')
}
</script>

<template>
  <modal-box
    v-model="value"
    title="Delete lesson"
    button-label="Confirm"
    has-cancel
    @confirm="confirm"
  >
    <p>
      Are you sure you wish to delete the lesson <strong>{{ title }}</strong>? This cannot be reversed.
    </p>
  </modal-box>
</template>
