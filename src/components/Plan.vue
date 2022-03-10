<script setup>
import CardComponent from '@/components/CardComponent.vue'
import StripeCheckout from '@/components/StripeCheckout.vue'
import { mdiCheckBold } from '@mdi/js'
import Icon from '@/components/Icon.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  features: {
    type: Array,
    required: true
  },
  pk: {
    type: String,
    required: true
  },
  lineItems: {
    type: Array,
    required: true
  }
})
</script>
<template>
  <card-component class="w-full">
    <div>
      <h2 class="text-xl font-bold text-center">
        {{ title }} plan
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
        :pk="pk"
        mode="subscription"
        :line-items="lineItems"
        :customer-email="$store.state.userEmail"
      />
    </div>
  </card-component>
</template>
