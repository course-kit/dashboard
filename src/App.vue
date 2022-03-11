<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import menu from '@/menu.js'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import Overlay from '@/components/Overlay.vue'
import { useRouter, useRoute } from 'vue-router'
import Notification from '@/components/Notification.vue'
import { mdiAlert } from '@mdi/js'
import Cookie from 'js-cookie'

const store = useStore()
const router = useRouter()
const route = useRoute()

store.dispatch('getUser')
  .then(user => {
    if (!user) {
      store.commit('setDataLoaded', true)
      router.push({ name: 'home' })
      console.log('Redirected to login.')
    } else {
      if (!user.plan && user.trialDaysRemaining === 0) {
        store.commit('setDataLoaded', true)
        router.push({ name: 'trial-ended' })
      } else {
        if (route.name === 'home' || window.location.pathname === '/') {
          router.push({ name: 'start' })
        }
        if (!store.state.dataLoaded) {
          Promise.all([
            store.dispatch('getCourses'),
            store.dispatch('getStudents'),
            store.dispatch('getSchools')
          ])
            .then(() => store.commit('setDataLoaded', true))
        }
      }
    }
  })

const isAsideLgActive = computed(() => store.state.isAsideLgActive)

const overlayClick = () => {
  store.dispatch('asideLgToggle', false)
}

const freeTrialReminder = 'free-trial-reminder'
const paymentOverdueReminder = 'payment-overdue-reminder'

const showFreeTrialReminder = computed(() => {
  const cookie = Cookie.get(freeTrialReminder)
  return !cookie && store.state.userTrialDaysRemaining
})

const showPaymentOverdueReminder = computed(() => {
  const cookie = Cookie.get(paymentOverdueReminder)
  return !cookie && store.state.userPaymentOverdue
})

</script>

<template>
  <aside-menu :menu="menu" />
  <div class="flex flex-col h-screen justify-between">
    <div>
      <div class="px-6" v-if="!$store.state.isFullScreen">
        <notification class="mt-6" :id="freeTrialReminder" :icon="mdiAlert" color="warning" v-if="showFreeTrialReminder">
          Your free trial ends in {{ $store.state.userTrialDaysRemaining }} days. Select a plan <router-link to="/billing" class="underline">here</router-link>.
        </notification>
        <notification class="mt-6" :id="paymentOverdueReminder" :icon="mdiAlert" color="danger" v-if="showPaymentOverdueReminder" :persist-dismiss-length="0">
          Your plan has expired. Please select another <router-link to="/billing" class="underline">here</router-link>.
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
