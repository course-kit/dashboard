<script setup>
import CardComponent from '@/components/CardComponent.vue'
import { mdiCheckBold } from '@mdi/js'
import Icon from '@/components/Icon.vue'

defineEmits(['select-customer-portal'])

defineProps({
  title: {
    type: String,
    required: true
  },
  features: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <card-component
    :class="{ 'w-full': true, 'border-blue-400 bg-blue-50': isSelected }"
  >
    <div>
      <h2 class="font-bold text-center">
        <span class="text-2xl mr-2">{{ title }}</span><span class="text-base">${{ price }}/mo</span>
      </h2>
      <ul class="pt-2">
        <li
          v-for="(feature, index) in features"
          :key="index"
        >
          <icon
            :path="mdiCheckBold"
            class="text-green-600"
          />
          {{ feature }}
        </li>
      </ul>
    </div>
    <div class="flex justify-center">
      <slot />
    </div>
  </card-component>
</template>
