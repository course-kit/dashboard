<script setup>
import { ref } from 'vue'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'

const titleStack = ref([{ name: 'Welcome to CourseKit' }])
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <p class="pb-4">
          Welcome to CourseKit! See the following resources to help you get up
          and running:
        </p>
        <ul class="list-disc ml-4 pb-4">
          <li class="pb-2">
            <a
              class="underline"
              href="https://github.com/course-kit/guides/blob/master/quick-start.md"
              target="_blank"
            >
              Quick start guide
            </a>
          </li>
          <li class="pb-2">
            <a
              class="underline"
              href="https://github.com/course-kit/client"
              target="_blank"
            >
              CourseKit JavaScript Client
            </a>
          </li>
          <li class="pb-2">
            <a
              class="underline"
              href="https://github.com/course-kit/nuxt-demo"
              target="_blank"
            >
              CourseKit Nuxt Demo
            </a>
          </li>
        </ul>
        <p>
          Need help? Join us on the
          <a
            href="https://discord.gg/ugXJFkw6hv"
            target="_blank"
            class="underline"
          >CourseKit Discord</a>.
        </p>
      </div>
    </div>
  </main-section>
</template>
