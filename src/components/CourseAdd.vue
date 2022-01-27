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
const urlDev = ref('')
const urlProd = ref('')
if (props.id) {
  title.value = store.getters.getCourseById(props.id).title
  urlDev.value = store.getters.getCourseById(props.id).urlDev
  urlProd.value = store.getters.getCourseById(props.id).urlProd
}
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const confirm = async () => {
  const payload = {
    title: title.value,
    urlDev: urlDev.value,
    urlProd: urlProd.value
  }
  if (props.id) {
    await store.dispatch('courseEdit', { id: props.id, ...payload })
    cancel()
    router.push(`/courses/${props.id}`)
  } else {
    const { id } = await store.dispatch('courseAdd', payload)
    cancel()
    router.push(`/courses/${id}`)
  }
}
const cancel = () => {
  if (!props.id) {
    title.value = ''
    urlDev.value = ''
    urlProd.value = ''
  }
}
</script>

<template>
  <modal-box
    v-model="value"
    :title="`${props.id ? 'Edit' : 'Add'} course`"
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
      label="Homepage URL (development)"
      help="Redirect students here after enrollment (for local development)"
    >
      <control
        v-model="urlDev"
        type="text"
        placeholder="Homepage URL"
      />
    </field>
    <field
      label="Homepage URL (production)"
      help="Redirect students here after enrollment (for production)"
    >
      <control
        v-model="urlProd"
        type="text"
        placeholder="Homepage URL"
      />
    </field>
  </modal-box>
</template>
