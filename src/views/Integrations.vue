<script setup>
import { ref } from 'vue'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import { useRoute, useRouter } from 'vue-router'
import Notification from '@/components/Notification.vue'
import { mdiCheckBold, mdiAlert } from '@mdi/js'
import JbButton from '@/components/JbButton.vue'
import { PLAN_FREE } from '@/constants.js'
const route = useRoute()
const router = useRouter()

const connectComplete = ref(route.query.connect === 'complete')
const connectIncomplete = ref(route.query.connect === 'incomplete')

let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.VUE_APP_API_URL
} else {
  baseURL = import.meta.env.VITE_API_URL
}

const stripeConnectUrl = `${baseURL}/stripe/connect`

const removeRouteQuery = function () {
  router.replace({ query: null })
}

const titleStack = ref([{ name: 'Integrations' }])
</script>

<template>
  <div
    v-if="connectComplete"
    class="mx-6 mt-6"
  >
    <notification
      id="connect--complete"
      color="success"
      :icon="mdiCheckBold"
      @dismissed="removeRouteQuery"
    >
      You have successfully completed Stripe Connect onboarding.
    </notification>
  </div>
  <div
    v-if="connectIncomplete"
    class="mx-6 mt-6"
  >
    <notification
      id="connect--incomplete"
      color="warning"
      :icon="mdiAlert"
      @dismissed="removeRouteQuery"
    >
      Looks like there was a problem completing Stripe Connect onboarding.
    </notification>
  </div>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <div v-if="$store.state.userPlan === PLAN_FREE">
      <h3 class="text-lg font-bold mb-2">
        Stripe Connect
      </h3>
      <p class="mb-4">
        Connection status:
        <em>{{
          $store.state.userStripeConnectEnabled ? "Active" : "Inactive"
        }}</em>
      </p>
      <p>
        <jb-button
          v-if="$store.state.userStripeConnectEnabled === false"
          color="white"
          type="a"
          label="Set up Stripe Connect"
          :href="stripeConnectUrl"
        />
      </p>
    </div>
    <div v-else>
      <p>No integrations currently available.</p>
    </div>
  </main-section>
</template>
