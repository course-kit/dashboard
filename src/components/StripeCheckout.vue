<script setup>
import { loadStripe } from '@stripe/stripe-js/dist/pure.esm.js'
import { ref } from 'vue'
import JbButton from '@/components/JbButton.vue'

const props = defineProps({
  pk: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    validator: (value) => ['payment', 'subscription'].includes(value),
    required: true
  },
  lineItems: {
    type: Array,
    default: () => []
  },
  successUrl: {
    type: String,
    default: window.location.href
  },
  cancelUrl: {
    type: String,
    default: window.location.href
  },
  clientReferenceId: {
    type: String,
    default: null
  },
  customerEmail: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    default: null
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
  stripeOptions: {
    type: Object,
    default: null
  }
})

const loading = ref(false)
async function redirectToCheckout () {
  loading.value = true
  const stripeOptions = {
    stripeAccount: props.stripeAccount,
    apiVersion: props.apiVersion,
    locale: props.locale
  }

  const stripe = await loadStripe(props.pk, stripeOptions)

  if (props.sessionId) {
    stripe.redirectToCheckout({
      sessionId: props.sessionId
    })
    return
  }

  const options = {
    cancelUrl: props.cancelUrl,
    // clientReferenceId: props.clientReferenceId,
    customerEmail: props.customerEmail,
    lineItems: props.lineItems,
    locale: props.locale,
    mode: props.mode,
    successUrl: props.successUrl
  }

  return stripe.redirectToCheckout(options)
}
</script>
<template>
  <jb-button
    type="button"
    :label="loading ? 'Loading...' : 'Select'"
    class="mt-4"
    @click="redirectToCheckout"
  />
</template>
