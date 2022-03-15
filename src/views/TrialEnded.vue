<script setup>
import Plans from '@/components/Plans.vue'
import LogoutButton from '@/components/LogoutButton.vue'
</script>

<template>
  <div>
    <div class="flex justify-end">
      <div class="p-6">
        <logout-button />
      </div>
    </div>
    <div class="flex flex-col items-center mt-16">
      <h1 class="font-bold text-3xl mb-8">
        Trial ended!
      </h1>
      <p class="mb-8 text-xl">
        To continue using CourseKit, please select a plan.
      </p>
      <Plans :has-plan="false" />
      <p class="mt-8">
        Got a question or issues with your account?
        <a href="mailto:hi@coursekit.dev">Please get in touch</a>.
      </p>
    </div>
  </div>
</template>
