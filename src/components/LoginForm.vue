<script setup>
import Field from '@/components/Field.vue'
import JbButton from '@/components/JbButton.vue'
import { onMounted, ref } from 'vue'
const email = ref('')
const password = ref('')
const name = ref('')
const confirmPassword = ref('')
const isLogin = ref(true)

function resetForm () {
  email.value = ''
  password.value = ''
  name.value = ''
  confirmPassword.value = ''
}

function toggleFormType () {
  resetForm()
  isLogin.value = !isLogin.value
}

const err = ref('')

onMounted(() => {
  const searchParams = new URLSearchParams(window.location.search)
  const errVal = searchParams.get('err')
  const typeVal = searchParams.get('type')
  if (errVal) {
    err.value = errVal
  }
  if (typeVal) {
    isLogin.value = typeVal !== 'reg'
  }
  window.history.replaceState(null, '', window.location.pathname)
})
</script>

<template>
  <div v-if="isLogin">
    <form
      method="POST"
      action="http://app.coursekit.test:8080/login"
    >
      <div v-if="err" class="bg-red-200 text-red-800 p-2 text-center rounded mb-4">
        {{ err }}
      </div>
      <Field>
        <input
          class="rounded w-full"
          id="email"
          v-model="email"
          name="email"
          type="email"
          placeholder="Email"
          autocomplete="username"
          required
        >
      </Field>
      <Field>
        <input
          class="rounded w-full"
          id="password"
          v-model="password"
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
    <button @click="toggleFormType" class="text-gray-500 text-sm">
      Don't have an account? <span class="underline">Create one here.</span>
    </button>
  </div>
  <div v-else>
    <form
      method="POST"
      action="http://app.coursekit.test:8080/register"
    >
      <div v-if="err" class="bg-red-200 text-red-800 p-2 text-center rounded mb-4">
        {{ err }}
      </div>
      <Field>
        <input
          class="rounded w-full"
          v-model="name"
          name="name"
          type="text"
          placeholder="John Smith"
          autocomplete="name"
          required
        >
      </Field>
      <Field>
        <input
          class="rounded w-full"
          v-model="email"
          name="email"
          type="email"
          placeholder="me@example.com"
          autocomplete="email"
          required
        >
      </Field>
      <Field>
        <input
          class="rounded w-full"
          v-model="password"
          name="password"
          type="password"
          placeholder="Password"
          autocomplete="new-password"
          required
        >
      </Field>
      <Field>
        <input
          class="rounded w-full"
          v-model="confirmPassword"
          name="confirm_password"
          type="password"
          placeholder="Confirm password"
          autocomplete="new-password"
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
    <button @click="toggleFormType" class="text-gray-500 text-sm">
      Already have an account? <span class="underline">Log in here.</span>
    </button>
  </div>
</template>
