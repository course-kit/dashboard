<script setup>
import { ref } from 'vue'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'

const titleStack = ref([{ name: 'Analytics' }])
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" />
  </main-section>
</template>
