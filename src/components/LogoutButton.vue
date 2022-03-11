<script setup>
import JbButton from '@/components/JbButton.vue'
let baseURL

if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.VUE_APP_API_URL
} else {
  baseURL = import.meta.env.VITE_API_URL
}

const logoutUrl = `${baseURL}/logout`
</script>
<template>
  <jb-button
    label="Log out"
    color="white"
    type="a"
    :href="logoutUrl"
  />
</template>
