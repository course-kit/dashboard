<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import menu from '@/menu.js'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import Overlay from '@/components/Overlay.vue'
import Notification from '@/components/Notification.vue'
import { mdiAlert } from '@mdi/js'
import Cookie from 'js-cookie'

const store = useStore()

const isAsideLgActive = computed(() => store.state.isAsideLgActive)

const overlayClick = () => {
  store.dispatch('asideLgToggle', false)
}

const paymentOverdueReminder = 'payment-overdue-reminder'

const showPaymentOverdueReminder = computed(() => {
  const cookie = Cookie.get(paymentOverdueReminder)
  return !cookie && store.state.userPaymentOverdue
})

let baseURL
if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.VUE_APP_API_URL
} else {
  baseURL = import.meta.env.VITE_API_URL
}

const customerPortalUrl = `${baseURL}/plans/manage`

</script>

<template>
  <aside-menu :menu="menu" />
  <div class="flex flex-col h-screen justify-between">
    <div>
      <div class="px-6" v-if="!$store.state.isFullScreen">
        <notification class="mt-6" :id="paymentOverdueReminder" :icon="mdiAlert" color="danger" v-if="showPaymentOverdueReminder" :persist-dismiss-length="0">
          Looks like there's an issue with your subscription. Please update your billing details <a :href="customerPortalUrl" class="underline">here</a>.
        </notification>
      </div>
      <div
        v-if="$store.getters.isLoading"
        class="p-6 font-bold"
      >
        Loading...
      </div>
      <router-view v-else />
    </div>
    <footer-bar />
  </div>
  <overlay
    v-show="isAsideLgActive"
    z-index="z-30"
    @overlay-click="overlayClick"
  />
</template>
