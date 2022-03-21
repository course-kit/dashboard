<script setup>
import Plan from '@/components/Plan.vue'

let pk

const props = defineProps({
  hasPlan: {
    type: Boolean,
    default: false
  },
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

const soloFeatures = ['Unlimited students & courses', 'Max 1 school']
const agencyFeatures = ['Unlimited students & courses', 'Max 10 schools']
</script>
<template>
  <div class="grid grid-cols-2 gap-6">
    <Plan
      :pk="pk"
      :plan-id="2"
      title="Solo"
      :price="19"
      :features="soloFeatures"
      :has-plan="props.hasPlan"
      :is-selected="$store.state.userPlan === 2"
      @select-customer-portal="selectCustomerPortal"
    />
    <Plan
      :pk="pk"
      :plan-id="3"
      title="Agency"
      :price="49"
      :features="agencyFeatures"
      :has-plan="props.hasPlan"
      :is-selected="$store.state.userPlan === 3"
      @select-customer-portal="selectCustomerPortal"
    />
  </div>
</template>
