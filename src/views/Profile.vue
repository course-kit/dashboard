<script setup>
import { ref } from 'vue'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'

const titleStack = ref([{ name: 'Profile' }])

let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.VUE_APP_API_URL
} else {
  baseURL = import.meta.env.VITE_API_URL
}

const logoutUrl = `${baseURL}/logout`

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <a
        v-if="$store.state.loginUrl"
        :href="$store.state.loginUrl"
      >Log in</a>
      <a
        v-else
        :href="logoutUrl"
      >Log out</a>
    </div>
  </main-section>
  <bottom-other-pages-section />
</template>
