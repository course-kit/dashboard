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
      router.push('login')
    } else {
      if (route.name === 'login') {
        router.push('courses')
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
      <router-view />
    </div>
    <footer-bar />
  </div>
  <overlay
    v-show="isAsideLgActive"
    z-index="z-30"
    @overlay-click="overlayClick"
  />
</template>
