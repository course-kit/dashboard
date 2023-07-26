<script setup>
import Field from '@/components/Field.vue'
import JbButton from '@/components/JbButton.vue'
import { onMounted, ref } from 'vue'

const email = ref('')
const message = ref('')

let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.VUE_APP_API_URL
} else {
  baseURL = import.meta.env.VITE_API_URL
}

const err = ref('')

onMounted(() => {
  const searchParams = new URLSearchParams(window.location.search)
  const errVal = searchParams.get('err')
  if (errVal) {
    err.value = errVal
  }
})

async function submit() {
  const res = await fetch(`${baseURL}/password-request`, {
    method: 'post',
    body: JSON.stringify({
      email: email.value
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (res.status === 500) {
    message.value = 'Error. Please try again.'
  } else {
    message.value = 'Password reset link sent. Please check your email.'
  }
}
</script>

<template>
  <div v-if="message">{{ message }}</div>
  <div v-else>
    <form
      @submit.prevent="submit"
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
      <jb-button
        class="w-full mb-3"
        type="submit"
        color="info"
        label="Send password reset"
      />
    </form>
    <div class="flex flex-col items-center">
      <router-link
        class="text-gray-500 text-sm"
        :to="{ name: 'home' }"
      >
        Return to <span class="underline">login form.</span>
      </router-link>
    </div>
  </div>
</template>
