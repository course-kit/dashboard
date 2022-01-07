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
const schoolUrl = ref(store.state.schoolUrl)

const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const confirm = async () => {
  const payload = { schoolUrl: schoolUrl.value }
  await store.dispatch('schoolEdit', payload)
  router.push('/courses')
}
const cancel = () => {
  schoolUrl.value = ''
}
</script>

<template>
  <modal-box
    v-model="value"
    title="Edit school"
    button-label="Save"
    has-cancel
    @confirm="confirm"
    @cancel="cancel"
  >
    <field
      label="School URL"
      help="Redirect students here after logout"
    >
      <control
        v-model="schoolUrl"
        type="text"
        placeholder="School URL"
      />
    </field>
  </modal-box>
</template>
