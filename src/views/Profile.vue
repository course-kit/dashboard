<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'

const store = useStore()

const titleStack = ref([{ name: 'Profile' }])

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" />
  </main-section>
  <bottom-other-pages-section />
</template>
