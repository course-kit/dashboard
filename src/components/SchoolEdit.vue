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
const schoolUrlDev = ref('')
const schoolUrlProd = ref('')

const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => {
    if (props.modelValue) {
      // modal opened
      reset()
    }
    return props.modelValue
  },
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const confirm = async () => {
  const payload = {
    schoolTitle: title.value,
    schoolUrlDev: schoolUrlDev.value,
    schoolUrlProd: schoolUrlProd.value
  }
  await store.dispatch('schoolEdit', payload)
}

const reset = async () => {
  title.value = store.state.schoolTitle
  schoolUrlDev.value = store.state.schoolUrlDev
  schoolUrlProd.value = store.state.schoolUrlProd
}

</script>

<template>
  <modal-box
    v-model="value"
    title="Edit school"
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
    <field
      label="School URL (development)"
      help="Redirect students here after logout (for local development)"
    >
      <control
        v-model="schoolUrlDev"
        type="text"
        placeholder="School URL"
      />
    </field>
    <field
      label="School URL (production)"
      help="Redirect students here after logout (for production)"
    >
      <control
        v-model="schoolUrlProd"
        type="text"
        placeholder="School URL"
      />
    </field>
  </modal-box>
</template>
