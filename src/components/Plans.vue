<script setup>
import Plan from '@/components/Plan.vue'
import StripeCheckout from '@/components/StripeCheckout.vue'
import JbButton from '@/components/JbButton.vue'

import { useStore } from 'vuex'

const store = useStore()
let pk

const props = defineProps({
  customerPortalUrl: {
    type: String,
    required: true
  }
})

if (process.env.NODE_ENV === 'production') {
  pk = process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY
} else {
  pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
}

function selectCustomerPortal () {
  window.location.href = props.customerPortalUrl
}

const freeFeatures = ['Unlimited students & courses', '$1 + 10% transaction fee per student']
const proFeatures = ['Unlimited students & courses', 'No transaction fees', 'Custom payment platform']
</script>

<template>
  <div class="grid grid-cols-2 gap-6">
    <Plan
      title="Free"
      :price="0"
      :features="freeFeatures"
      :is-selected="$store.state.userPlan === 1"
    >
      <jb-button
        v-if="$store.state.userPlan !== 1"
        type="button"
        label="Current"
        class="mt-4"
        disabled
      />
      <jb-button
        v-else
        type="button"
        label="Select"
        class="mt-4"
        @click="selectCustomerPortal"
      />
    </Plan>
    <Plan
      title="Pro"
      :price="49"
      :features="proFeatures"
      :is-selected="$store.state.userPlan === 4"
    >
      <stripe-checkout
        v-if="$store.state.userPlan !== 4"
        :pk="pk"
        :plan-id="4"
      />
      <jb-button
        v-else
        type="button"
        label="Current"
        class="mt-4"
        disabled
      />
    </Plan>
  </div>
  <div class="mt-8">
    <p v-if="hasPlan">
      <a
        :href="customerPortalUrl"
        class="underline"
      >Manage your account</a>
    </p>
  </div>
</template>
