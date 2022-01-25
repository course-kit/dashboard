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
  }
})
const store = useStore()
const router = useRouter()
const schoolUrlDev = ref(store.state.schoolUrlDev)
const schoolUrlProd = ref(store.state.schoolUrlProd)

const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const confirm = async () => {
  const payload = {
    schoolUrlDev: schoolUrlDev.value,
    schoolUrlProd: schoolUrlProd.value
  }
  await store.dispatch('schoolEdit', payload)
  router.push('/courses')
}
</script>

<template>
  <modal-box
    v-model="value"
    title="Edit school"
    button-label="Save"
    has-cancel
    @confirm="confirm"
  >
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
