<script setup>
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'

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
        <img src="/logo.png" class="h-6 mb-6">
        <div class="flex-col flex justify-center items-center">
          <jb-button
            class="w-60 mb-3"
            type="submit"
            color="info"
            label="Login"
            :href="$store.state.loginUrl"
          />
          <jb-button
            class="w-60"
            type="submit"
            color="info"
            label="Create account"
            outline
            :href="$store.state.regUrl"
          />
        </div>
      </div>

    </card-component>
  </full-screen-section>
</template>
