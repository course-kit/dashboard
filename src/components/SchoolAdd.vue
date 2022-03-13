<script setup>
import { computed, ref } from 'vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import ModalBox from '@/components/ModalBox.vue'
import { useStore } from 'vuex'
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  }
})
const store = useStore()
const title = ref('')
const emit = defineEmits(['update:modelValue', 'error'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const confirm = async () => {
  const payload = {
    title: title.value
  }
  const id = await store.dispatch('schoolAdd', payload)
  if (id) {
    cancel()
    await store.dispatch('changeSchool', id)
  } else {
    emit('error', { message: 'Cannot add additional schools on this plan. Please upgrade.' })
  }
}
const cancel = () => {
  title.value = ''
}
</script>

<template>
  <modal-box
    v-model="value"
    title="Add school"
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
