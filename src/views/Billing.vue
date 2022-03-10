<script setup>
import { ref, computed } from 'vue'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import Plans from '@/components/Plans.vue'
import { useStore } from 'vuex'

let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.VUE_APP_API_URL
} else {
  baseURL = import.meta.env.VITE_API_URL
}

const managePlanUrl = `${baseURL}/plans/manage`

const store = useStore()

const currentPlan = computed(() => {
  switch (store.state.userPlan) {
    case 1:
      return 'Free'
    case 2:
      return 'Basic'
    case 3:
      return 'Pro'
    default:
      return 'None'
  }
})

const trialDaysRemaining = computed(() => {
  return store.state.userTrialDaysRemaining
})

const titleStack = ref([{ name: 'Billing' }])
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <div class="mb-8">
      <p>
        <strong>Current plan:</strong> {{ currentPlan }}.
        <a
          :href="managePlanUrl"
          class="underline"
        >Manage your plan</a>.
      </p>
      <p v-if="trialDaysRemaining">
        <strong>Free trial days remaining:</strong> {{ trialDaysRemaining }}
      </p>
    </div>
    <Plans />
  </main-section>
</template>
