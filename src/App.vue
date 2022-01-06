<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import menu from '@/menu.js'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import Overlay from '@/components/Overlay.vue'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

store.dispatch('getUser')
  .then(user => {
    if (!user) {
      store.commit('setDataLoaded', true)
      router.push({ name: 'home' })
    } else {
      if (route.name === 'home' || window.location.pathname === '/') {
        router.push({ name: 'start' })
      }
      if (!store.state.dataLoaded) {
        Promise.all([
          store.dispatch('getCourses'),
          store.dispatch('getStudents')
        ])
          .then(() => store.commit('setDataLoaded', true))
      }
    }
  })

const isAsideLgActive = computed(() => store.state.isAsideLgActive)

const overlayClick = () => {
  store.dispatch('asideLgToggle', false)
}
</script>

<template>
  <aside-menu :menu="menu" />
  <div class="flex flex-col h-screen justify-between">
    <div>
      <div v-if="$store.getters.isLoading" class="p-6 font-bold">
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
