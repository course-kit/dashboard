<script setup>
import { ref } from 'vue'

import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import SchoolsTable from '@/components/SchoolsTable.vue'
import CardComponent from '@/components/CardComponent.vue'

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
      <div>
        <p class="mb-4">
          <span class="font-bold">{{ $store.state.userName }}</span>
          <span>&nbsp;&lt;{{ $store.state.userEmail }}></span>
        </p>
        <p>
          <a
            :href="logoutUrl"
            class="inline-flex cursor-pointer justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring-2 focus:border-transparent duration-150 border rounded ring-blue-700 p-2 bg-blue-500 text-white border-blue-600 hover:bg-blue-600 mr-3 last:mr-0 mb-3"
          >Log out</a>
        </p>
      </div>
    </div>
    <card-component
      v-if="$store.state.isAdmin"
      class="mb-6"
      title="Schools"
      header-icon=""
      has-table
    >
      <schools-table />
    </card-component>
  </main-section>
</template>
