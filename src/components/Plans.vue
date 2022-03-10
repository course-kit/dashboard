<script setup>
import Plan from '@/components/Plan.vue'

let pk
const basic = []
const pro = []

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

const basicFeatures = ['Feature 1', 'Feature 2']
const proFeatures = ['Feature 1', 'Feature 2']
</script>
<template>
  <div class="grid grid-cols-3 gap-6 w-full">
    <Plan
      :pk="pk"
      :line-items="basic"
      title="Basic"
      :features="basicFeatures"
    />
    <Plan
      :pk="pk"
      :line-items="pro"
      title="Pro"
      :features="proFeatures"
    />
  </div>
</template>
