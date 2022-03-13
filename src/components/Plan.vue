<script setup>
import CardComponent from '@/components/CardComponent.vue'
import StripeCheckout from '@/components/StripeCheckout.vue'
import JbButton from '@/components/JbButton.vue'
import { mdiCheckBold } from '@mdi/js'
import Icon from '@/components/Icon.vue'

defineEmits({
  selectCustomerPortal: {}
})

const props = defineProps({
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
  pk: {
    type: String,
    required: true
  },
  lineItems: {
    type: Array,
    required: true
  },
  hasPlan: {
    type: Boolean,
    default: false
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <card-component
    :class="{ 'w-full': true, 'border-blue-400 bg-blue-50': props.isSelected }"
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
      <stripe-checkout
        v-if="!hasPlan"
        :pk="pk"
        mode="subscription"
        :line-items="lineItems"
        :customer-email="$store.state.userEmail"
      />
      <jb-button
        v-else-if="!isSelected"
        type="button"
        label="Select"
        class="mt-4"
        @click="$emit('select-customer-portal')"
      />
      <jb-button
        v-else
        type="button"
        label="Current"
        class="mt-4"
        disabled
      />
    </div>
  </card-component>
</template>
