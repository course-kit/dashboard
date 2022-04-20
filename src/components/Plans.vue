<script setup>
import Plan from '@/components/Plan.vue'
import StripeCheckout from '@/components/StripeCheckout.vue'
import JbButton from '@/components/JbButton.vue'
import { PLAN_FREE, PLAN_PRO } from '@/constants.js'

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

const freeFeatures = [
  'Unlimited students & courses',
  '$1 + 10% transaction fee per student'
]
const proFeatures = [
  'Unlimited students & courses',
  'No transaction fees',
  'Custom payment platform'
]
</script>

<template>
  <div class="grid grid-cols-2 gap-6">
    <Plan
      title="Free"
      :price="0"
      :features="freeFeatures"
      :is-selected="$store.state.userPlan === PLAN_FREE"
    >
      <jb-button
        v-if="$store.state.userPlan !== PLAN_PRO"
        type="button"
        label="Current"
        class="mt-4"
        disabled
      />
      <jb-button
        v-else
        color="info"
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
      :is-selected="$store.state.userPlan === PLAN_PRO"
    >
      <stripe-checkout
        v-if="$store.state.userPlan !== PLAN_PRO"
        :pk="pk"
        :plan-id="PLAN_PRO"
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
    <p v-if="$store.state.userPlan === PLAN_PRO">
      <a
        :href="customerPortalUrl"
        class="underline"
      >Manage your account</a>
    </p>
  </div>
</template>
