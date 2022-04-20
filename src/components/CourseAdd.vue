<script setup>
import { computed, ref } from 'vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import ModalBox from '@/components/ModalBox.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import validUrl from 'valid-url'
import { PLAN_FREE } from '@/constants.js'

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
const path = ref('')
const price = ref(0)

const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => {
    if (props.modelValue) {
      reset()
    }
    return props.modelValue
  },
  set: (value) => emit('update:modelValue', value)
})
const confirm = async () => {
  const payload = {
    title: title.value,
    path: path.value,
    price: price.value > 0 ? price.value.toFixed(2) : 0
  }
  if (props.id) {
    await store.dispatch('courseEdit', { id: props.id, ...payload })
    reset()
    router.push(`/courses/${props.id}`)
  } else {
    const { id } = await store.dispatch('courseAdd', payload)
    reset()
    router.push(`/courses/${id}`)
  }
}
const reset = () => {
  if (!props.id) {
    title.value = ''
    path.value = ''
  } else {
    title.value = store.getters.getCourseById(props.id).title
    path.value = store.getters.getCourseById(props.id).path
    price.value = store.getters.getCourseById(props.id).price
  }
}

const validators = [
  () => {
    let url
    try {
      url = new URL(path.value, 'https://google.com').href
    } catch (err) {
      console.log(err)
      url = ''
    }
    if (!validUrl.isWebUri(url)) {
      return 'Path is invalid.'
    } else {
      return null
    }
  },
  () => {
    if (!store.state.userStripeConnectEnabled && price.value !== 0) {
      return 'Price cannot be set without Stripe Connect integration. See Integrations tab.'
    } else {
      return null
    }
  }
]
</script>

<template>
  <modal-box
    v-model="value"
    :title="`${props.id ? 'Edit' : 'Add'} course`"
    button-label="Save"
    has-cancel
    :validators="validators"
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
    <field
      v-if="props.id"
      label="Path"
      help="Path to course e.g. /courses/my-course. Can use {id} for course ID e.g. /courses/{id}."
    >
      <control
        v-model="path"
        type="text"
        placeholder="Path"
      />
    </field>
    <field
      v-if="props.id && $store.state.userPlan === PLAN_FREE"
      label="Price (USD)"
      help="Use 0 if course is free."
    >
      <control
        v-model="price"
        type="number"
        placeholder="Price"
      />
    </field>
  </modal-box>
</template>
