<script setup>
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
</script>

<template>
  <full-screen-section
    v-slot="{ cardClass, cardRounded }"
    bg="error"
  >
    <card-component
      :class="cardClass"
      :rounded="cardRounded"
    >
      <div class="space-y-3">
        <h1 class="text-2xl">
          404
        </h1>
        <p>Page not found.</p>
        <jb-buttons>
          <jb-button
            label="Back to home page"
            to="/"
            color="info"
          />
        </jb-buttons>
      </div>
    </card-component>
  </full-screen-section>
</template>
