<script setup>
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import LoginForm from '@/components/LoginForm.vue'
</script>

<template>
  <full-screen-section
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >
    <card-component
      :class="cardClass"
      :rounded="cardRounded"
    >
      <div class="flex-col flex justify-center items-center my-4">
        <img
          src="/logo.png"
          class="h-6 mb-6"
        >
        <div class="flex-col flex justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </card-component>
  </full-screen-section>
</template>
