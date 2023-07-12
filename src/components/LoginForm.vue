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
      <div
        v-if="err"
        class="bg-red-200 text-red-800 p-2 text-center rounded mb-4"
      >
        {{ err }}
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
    <button
      class="text-gray-500 text-sm"
      @click="toggleFormType"
    >
      Don't have an account? <span class="underline">Create one here.</span>
    </button>
  </div>
  <div v-else>
    <form
      method="POST"
      action="http://app.coursekit.test:8080/register"
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
