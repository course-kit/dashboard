<script setup>
// import { VideoUploader } from '@api.video/video-uploader'
import { computed, ref } from 'vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import ModalBox from '@/components/ModalBox.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()

const title = ref('')

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  courseId: {
    type: String,
    required: true
  },
  lessonId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => {
    if (props.modelValue) {
      // modal opened, reset form
      reset()
    }
    return props.modelValue
  },
  set: (value) => emit('update:modelValue', value)
})

const confirm = async () => {
  const courseId = props.courseId
  const lessonId = props.lessonId
  if (props.lessonId) {
    await store.dispatch('lessonEdit', {
      lessonId,
      courseId,
      title: title.value
    })
    reset()
    router.push(`/courses/${courseId}/lessons/${lessonId}`)
  } else {
    const { id } = await store.dispatch('lessonAdd', {
      courseId,
      title: title.value
    })
    reset()
    if (courseId && id) {
      router.push(`/courses/${courseId}/lessons/${id}`)
    }
  }
}
const reset = () => {
  if (props.lessonId) {
    title.value = store.getters.getLessonById(
      props.courseId,
      props.lessonId
    ).title
  } else {
    title.value = ''
  }
}
</script>

<template>
  <modal-box
    v-model="value"
    title="Add lesson"
    button-label="Save"
    has-cancel
    @confirm="confirm"
    @cancel="reset"
  >
    <field label="Title">
      <control
        v-model="title"
        type="text"
        placeholder="Title"
      />
    </field>
  </modal-box>
</template>
