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
const content = ref('')
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  courseId: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirm = async () => {
  const data = { title: title.value, content: content.value }
  const courseId = props.courseId
  const { lessonId } = await store.dispatch('lessonAdd', { courseId, data })
  if (courseId && lessonId) {
    router.push(`/courses/${courseId}/lessons/${lessonId}`)
  }
}
const cancel = () => {
  title.value = ''
  content.value = ''
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
    <field label="Content">
      <control
        v-model="content"
        type="textarea"
        placeholder="Content"
      />
    </field>
  </modal-box>
</template>
