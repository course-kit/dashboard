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

if (props.lessonId) {
  title.value = store.getters.getLessonById(
    props.courseId,
    props.lessonId
  ).title
}

const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
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
    cancel()
    router.push(`/courses/${courseId}/lessons/${lessonId}`)
  } else {
    const { id } = await store.dispatch('lessonAdd', {
      courseId,
      title: title.value
    })
    cancel()
    if (courseId && id) {
      router.push(`/courses/${courseId}/lessons/${id}`)
    }
  }
}
const cancel = () => {
  title.value = ''
}
</script>

<template>
  <modal-box
    v-model="value"
    title="Add lesson"
    button-label="Save"
    has-cancel
    @confirm="confirm"
    @cancel="cancel"
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
