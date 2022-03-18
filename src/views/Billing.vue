<script setup>
import { ref, computed } from 'vue'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import Plans from '@/components/Plans.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Notification from '@/components/Notification.vue'
import { mdiCheckBold } from '@mdi/js'

const route = useRoute()
const router = useRouter()

const showThankYou = ref(route.query['post-purchase'])

let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.VUE_APP_API_URL
} else {
  baseURL = import.meta.env.VITE_API_URL
}

const customerPortalUrl = `${baseURL}/plans/manage`

const store = useStore()

const hasPlan = store.state.userPlan !== null && store.state.userPlan !== 0

const trialDaysRemaining = computed(() => {
  return store.state.userTrialDaysRemaining
})

const removeRouteQuery = function () {
  router.replace({ query: null })
}

const titleStack = ref([{ name: 'Billing' }])
</script>

<template>
  <div
    v-if="showThankYou"
    class="mx-6 mt-6"
  >
    <notification
      id="plan--updated"
      color="success"
      :icon="mdiCheckBold"
      @dismissed="removeRouteQuery"
    >
      Your plan has been successfully updated!
    </notification>
  </div>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <div v-if="trialDaysRemaining">
      <p class="mb-8">
        <strong>Free trial days remaining:</strong> {{ trialDaysRemaining }}
      </p>
    </div>
    <Plans
      :has-plan="hasPlan"
      :customer-portal-url="customerPortalUrl"
    />
    <div class="mt-8">
      <p v-if="hasPlan">
        <a
          :href="customerPortalUrl"
          class="underline"
        >Manage your account</a>
      </p>
    </div>
  </main-section>
</template>
