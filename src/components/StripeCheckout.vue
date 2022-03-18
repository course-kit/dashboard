<script setup>
import { loadStripe } from '@stripe/stripe-js/dist/pure.esm.js'
import { ref } from 'vue'
import JbButton from '@/components/JbButton.vue'
import { planCheckout } from '@/apiService'

const props = defineProps({
  pk: {
    type: String,
    required: true
  },
  planId: {
    type: Number,
    required: true
  },
  stripeAccount: {
    type: String,
    default: undefined
  },
  apiVersion: {
    type: String,
    default: undefined
  },
  locale: {
    type: String,
    default: 'en'
  },
})

const loading = ref(false)
async function redirectToCheckout () {
  loading.value = true
  try {
    const stripeOptions = {
      stripeAccount: props.stripeAccount,
      apiVersion: props.apiVersion,
      locale: props.locale
    }
    const stripe = await loadStripe(props.pk, stripeOptions)
    const response = await planCheckout(props.planId)
    const data = await response.json()
    const options = {
      sessionId: data.sessionId
    }
    return stripe.redirectToCheckout(options)
  } catch (err) {
    console.log(err)
    loading.value = false
  }
}
</script>
<template>
  <jb-button
    type="button"
    color="info"
    :label="loading ? 'Loading...' : 'Select'"
    class="mt-4"
    @click="redirectToCheckout"
  />
</template>
