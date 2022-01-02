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
      <jb-buttons>
        <jb-button
          type="submit"
          color="info"
          label="Create account"
          outline
          :href="$store.state.regUrl"
        />
      </jb-buttons>
      <jb-buttons>
        <jb-button
          type="submit"
          color="info"
          label="Login"
          :href="$store.state.loginUrl"
        />
      </jb-buttons>
    </card-component>
  </full-screen-section>
</template>
