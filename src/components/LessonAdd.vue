<script setup>
import { VideoUploader } from '@api.video/video-uploader'
import { computed, ref } from 'vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import ModalBox from '@/components/ModalBox.vue'
const name = ref('')
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  }
})
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

</script>

<template>
  <modal-box
    v-model="value"
    title="Add lesson"
    button-label="Save and upload"
    has-cancel
  >
    <field label="Lesson name">
      <control
        v-model="name"
        type="text"
        placeholder="Lesson name"
      />
    </field>
    <field label="Select video">
      <control
        v-model="file"
        type="file"
        placeholder="Select file"
      />
    </field>
  </modal-box>
</template>
