<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Level from '@/components/Level.vue'

const store = useStore()

const year = computed(() => new Date().getFullYear())

const isFooterBarVisible = computed(() => !store.state.isFullScreen)
</script>

<template>
  <footer
    v-show="isFooterBarVisible"
    class="bg-white py-2 px-6 dark:bg-gray-900"
  >
    <level
      type="justify-end"
      class="w-full"
    >
      <div class="text-sm text-gray-500">
        <span>Beta v1&nbsp;</span>
        <span>| &copy; {{ year }} |
          <a
            href="https://coursekit.dev/"
            target="_blank"
          >Course Kit Pty Ltd</a>
        </span>
      </div>
    </level>
  </footer>
</template>
