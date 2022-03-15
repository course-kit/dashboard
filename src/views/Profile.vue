<script setup>
import { ref } from 'vue'

import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import LogoutButton from '@/components/LogoutButton.vue'

const titleStack = ref([{ name: 'Profile' }])
</script>
<template>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <div>
      <div>
        <p class="mb-4">
          <span class="font-bold">{{ $store.state.userName }}</span>
          <span>&nbsp;&lt;{{ $store.state.userEmail }}></span>
        </p>
        <p>
          <logout-button />
        </p>
      </div>
    </div>
  </main-section>
</template>
