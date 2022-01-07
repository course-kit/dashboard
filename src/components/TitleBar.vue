<script setup>
import Level from '@/components/Level.vue'

defineProps({
  titleStack: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <section class="p-6">
    <level>
      <ul>
        <li
          v-for="(title, index) in titleStack"
          :key="index"
          class="title-stack-item inline-block pr-3 text-xl text-gray-500 last:pr-0 last:text-black last:font-bold"
        >
          <router-link
            v-if="title.to"
            :to="title.to"
            class="underline"
          >
            {{ title.name }}
          </router-link>
          <span v-else>{{ title.name }}</span>
        </li>
      </ul>
    </level>
  </section>
</template>

<style scoped>
li.title-stack-item:not(:last-child):after {
  content: "/";
  @apply inline-block pl-3;
}
</style>
