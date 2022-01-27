<script setup>
import { computed, ref } from 'vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
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
const courses = computed(() =>
  store.state.courses.map((course) => {
    return {
      id: course.id,
      label: course.title
    }
  })
)
const name = ref('')
const email = ref('')
const course = ref('')
const devMode = ref('')
const componentKey = ref(0)

if (props.id) {
  name.value = store.getters.getStudentById(props.id).name
  email.value = store.getters.getStudentById(props.id).email
  course.value = store.getters.getStudentById(props.id).course
}
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
const confirm = async () => {
  const payload = {
    name: name.value,
    email: email.value,
    courseId: course.value.id,
    devMode: devMode.value
  }
  if (props.id) {
    await store.dispatch('studentEdit', { id: props.id, data: payload })
    cancel()
    router.push(`/students/${props.id}`)
  } else {
    await store.dispatch('studentAdd', payload)
    cancel()
  }
}

function devModeChecked (e) {
  devMode.value = e
}

const cancel = () => {
  name.value = ''
  email.value = ''
  course.value = ''
  devMode.value = false
  componentKey.value++
}
</script>

<template>
  <modal-box
    v-model="value"
    :title="`${props.id ? 'Edit' : 'Add'} student`"
    button-label="Save"
    has-cancel
    @confirm="confirm"
    @cancel="cancel"
  >
    <field label="Full name">
      <control
        v-model="name"
        type="text"
        placeholder="Full name"
      />
    </field>
    <field label="Email">
      <control
        v-model="email"
        type="email"
        placeholder="Email"
      />
    </field>
    <field label="Course">
      <control
        v-model="course"
        type="select"
        :options="courses"
      />
    </field>
    <field label="Redirect to dev homepage URL">
      <checkbox-cell
        :key="componentKey"
        type="span"
        @checked="devModeChecked"
      />
    </field>
  </modal-box>
</template>
