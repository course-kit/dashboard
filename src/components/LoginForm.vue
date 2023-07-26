<script setup>
import Field from '@/components/Field.vue'
import JbButton from '@/components/JbButton.vue'
import { onMounted, ref } from 'vue'
const email = ref('')
const password = ref('')
const name = ref('')
const confirmPassword = ref('')
const isLogin = ref(true)
const registrationCode = ref('')

let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.VUE_APP_API_URL
} else {
  baseURL = import.meta.env.VITE_API_URL
}

function resetForm () {
  email.value = ''
  password.value = ''
  name.value = ''
  confirmPassword.value = ''
  registrationCode.value = ''
}

function toggleFormType () {
  resetForm()
  isLogin.value = !isLogin.value
}

const err = ref('')
const message = ref('')

onMounted(() => {
  const searchParams = new URLSearchParams(window.location.search)
  const errVal = searchParams.get('err')
  const typeVal = searchParams.get('type')
  const messageVal = searchParams.get('message')
  if (errVal) {
    err.value = errVal
  }
  if (typeVal) {
    isLogin.value = typeVal !== 'reg'
  }
  if (messageVal) {
    message.value = messageVal
  }
  window.history.replaceState(null, '', window.location.pathname)
})
</script>

<template>
  <div v-if="isLogin">
    <form
      method="POST"
      :action="`${baseURL}/login`"
    >
      <div
        v-if="err"
        class="bg-red-200 text-red-800 p-2 text-center rounded mb-4"
      >
        {{ err }}
      </div>
      <div
        v-if="message"
        class="bg-green-200 text-green-800 p-2 text-center rounded mb-4"
      >
        {{ message }}
      </div>
      <Field>
        <input
          id="email"
          v-model="email"
          class="rounded w-full"
          name="email"
          type="email"
          placeholder="Email"
          autocomplete="username"
          required
        >
      </Field>
      <Field>
        <input
          id="password"
          v-model="password"
          class="rounded w-full"
          name="password"
          type="password"
          placeholder="Password"
          autocomplete="current-password"
          required
        >
      </Field>
      <jb-button
        class="w-full mb-3"
        type="submit"
        color="info"
        label="Login"
      />
    </form>
    <div class="flex flex-col items-center gap-2">
      <button
        class="text-gray-500 text-sm"
        @click="toggleFormType"
      >
        Don't have an account? <span class="underline">Create one here.</span>
      </button>
      <router-link
        class="text-gray-500 text-sm"
        :to="{ name: 'passwordRequest' }"
      >
        Forgot your password? <span class="underline">Reset it here.</span>
      </router-link>
    </div>
  </div>
  <div v-else>
    <form
      method="POST"
      :action="`${baseURL}/register`"
    >
      <div
        v-if="err"
        class="bg-red-200 text-red-800 p-2 text-center rounded mb-4"
      >
        {{ err }}
      </div>
      <Field>
        <input
          v-model="name"
          class="rounded w-full"
          name="name"
          type="text"
          placeholder="John Smith"
          autocomplete="name"
          required
        >
      </Field>
      <Field>
        <input
          v-model="email"
          class="rounded w-full"
          name="email"
          type="email"
          placeholder="me@example.com"
          autocomplete="email"
          required
        >
      </Field>
      <Field>
        <input
          v-model="password"
          class="rounded w-full"
          name="password"
          type="password"
          placeholder="Password"
          autocomplete="new-password"
          required
        >
      </Field>
      <Field>
        <input
          v-model="confirmPassword"
          class="rounded w-full"
          name="confirm_password"
          type="password"
          placeholder="Confirm password"
          autocomplete="new-password"
          required
        >
      </Field>
      <Field>
        <input
          v-model="registrationCode"
          class="rounded w-full"
          name="registration_code"
          type="text"
          placeholder="Registration code (contact us)"
          required
        >
      </Field>
      <jb-button
        class="w-full mb-3"
        type="submit"
        color="info"
        label="Create account"
      />
    </form>
    <button
      class="text-gray-500 text-sm"
      @click="toggleFormType"
    >
      Already have an account? <span class="underline">Log in here.</span>
    </button>
  </div>
</template>
