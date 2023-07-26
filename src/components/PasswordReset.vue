<script setup>
import Field from '@/components/Field.vue'
import JbButton from '@/components/JbButton.vue'
import { onMounted, ref } from 'vue'
const password = ref('')
const passwordConfirm = ref('')

let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.VUE_APP_API_URL
} else {
  baseURL = import.meta.env.VITE_API_URL
}

const err = ref('')
const time = ref('')
const hash = ref('')
const userId = ref('')

onMounted(() => {
  const searchParams = new URLSearchParams(window.location.search)
  const errVal = searchParams.get('err')
  if (errVal) {
    err.value = errVal
  }
  const params = new URLSearchParams(window.location.search)
  time.value = params.get('time')
  hash.value = params.get('hash')
  userId.value = params.get('userId')
})
</script>

<template>
  <div>
    <form
      method="POST"
      :action="`${baseURL}/password-update`"
    >
      <div
        v-if="err"
        class="bg-red-200 text-red-800 p-2 text-center rounded mb-4"
      >
        {{ err }}
      </div>
      <Field>
        <input
          id="password"
          v-model="password"
          class="rounded w-full"
          name="password"
          type="password"
          placeholder="Password"
          autocomplete="password"
          required
        >
      </Field>
      <Field>
        <input
          id="password-confirm"
          v-model="passwordConfirm"
          class="rounded w-full"
          name="password_confirm"
          type="password"
          placeholder="Password confirm"
          autocomplete="password_confirm"
          required
        >
      </Field>
      <input
        id="time"
        v-model="time"
        name="time"
        type="hidden"
      >
      <input
        id="hash"
        v-model="hash"
        name="hash"
        type="hidden"
      >
      <input
        id="userId"
        v-model="userId"
        name="userId"
        type="hidden"
      >
      <jb-button
        class="w-full mb-3"
        type="submit"
        color="info"
        label="Update password"
      />
    </form>
  </div>
</template>
