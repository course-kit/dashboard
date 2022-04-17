<script setup>
import { ref } from 'vue'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import Plans from '@/components/Plans.vue'
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
    <Plans :customer-portal-url="customerPortalUrl" />
  </main-section>
</template>
