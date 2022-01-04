<script setup>
import { computed, ref } from 'vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import ModalBox from '@/components/ModalBox.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
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
const router = useRouter()
const title = ref('')
const homeUrl = ref('')
if (props.id) {
  title.value = store.getters.getCourseById(props.id).title
  homeUrl.value = store.getters.getCourseById(props.id).homeUrl
}
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const confirm = async () => {
  const payload = { title: title.value, homeUrl: homeUrl.value }
  if (props.id) {
    await store.dispatch('courseEdit', { id: props.id, data: payload })
    router.push(`/courses/${props.id}`)
  } else {
    const { id } = await store.dispatch('courseAdd', payload)
    router.push(`/courses/${id}`)
  }
}
const cancel = () => {
  title.value = ''
  homeUrl.value = ''
}
</script>

<template>
  <modal-box
    v-model="value"
    :title="`${props.id ? 'Edit' : 'Add' } course`"
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
    <field
      label="Home page URL"
      help="Redirect students here after enrollment"
    >
      <control
        v-model="homeUrl"
        type="text"
        placeholder="Home page URL"
      />
    </field>
  </modal-box>
</template>
