<script setup>
import Plan from '@/components/Plan.vue'

let pk
const basic = []
const pro = []

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
  basic.push({
    price: process.env.VUE_APP_STRIPE_PRODUCT_BASIC,
    quantity: 1
  })
  pro.push({
    price: process.env.VUE_APP_STRIPE_PRODUCT_PRO,
    quantity: 1
  })
} else {
  pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  basic.push({
    price: import.meta.env.VITE_STRIPE_PRODUCT_BASIC,
    quantity: 1
  })
  pro.push({
    price: import.meta.env.VITE_STRIPE_PRODUCT_PRO,
    quantity: 1
  })
}

function selectCustomerPortal () {
  window.location.href = props.customerPortalUrl
}

const basicFeatures = ['Unlimited students & courses', 'Max 1 school']
const proFeatures = ['Unlimited students & courses', 'Max 10 schools']
</script>
<template>
  <div class="grid grid-cols-2 gap-6">
    <Plan
      :pk="pk"
      :line-items="basic"
      title="Basic"
      :price="19"
      :features="basicFeatures"
      :has-plan="props.hasPlan"
      :is-selected="$store.state.userPlan === 2"
      @select-customer-portal="selectCustomerPortal"
    />
    <Plan
      :pk="pk"
      :line-items="pro"
      title="Pro"
      :price="49"
      :features="proFeatures"
      :has-plan="props.hasPlan"
      :is-selected="$store.state.userPlan === 3"
      @select-customer-portal="selectCustomerPortal"
    />
  </div>
</template>
