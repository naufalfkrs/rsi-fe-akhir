<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-lg text-black">
      <div v-if="isValidToken">
        <div class="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" class="w-24 h-24">
        </div>
        <h1 class="text-2xl font-bold mb-4 text-center">Digital Signature Verification</h1>
        <div v-if="letterData">
          <div class="text-center mb-4">
          </div>
          <div class="mb-4 text-center">
            <p class="text-lg"><strong>Letter ID:</strong> {{ letterData.id }}</p>
            <p class="text-lg"><strong>Status:</strong> {{ formattedStatus }}</p>
            <p class="text-lg"><strong>Date:</strong> {{ letterData.created_at }}</p>
          </div>
          <div class="text-center mb-4">
            <p>telah ditandatangani oleh pengguna E-Office sebagai berikut</p>
          </div>
          <div class="flex items-center justify-center mb-4 p-4 rounded-md gap-10">
            <div>
              <p><strong>Recipient:</strong></p>
              <div v-if="is_sign === '0'">
                <p>{{ letterData.signer_name }}</p>
              </div>
              <div v-if="is_sign === '1'">
                <p>{{ letterData.replace_signer_name }} (Perwakilan)</p>
              </div>
            </div>
            <div>
              <p><strong>Recipient ID:</strong></p>
              <p>{{ letterData.signature }}</p>
            </div>
          </div>
          <div class="text-center text-green-600">
            <p><i class="fas fa-check-circle"></i> This is true and recorded in our audit trail</p>
          </div>
        </div>
        <div v-else>
          <p class="text-center">Loading...</p>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-red-600">Invalid or expired token.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const letterData = ref(null)
const is_sign = ref('')
const approverName = ref(null)
const approverId = ref(null)
const token = ref(null)
const { $api } = useNuxtApp()

const formattedStatus = computed(() => {
  return letterData.value?.status.charAt(0).toUpperCase() + letterData.value?.status.slice(1).toLowerCase()
})

const isValidToken = computed(() => {
  const tokenFromQuery = route.query.token as string;
  return token.value === tokenFromQuery;
})

onMounted(async () => {
  const letterId = route.params.id
  try {

    const tokenResponse = await $api.get(`/v1/letter/${letterId}/token`)
    token.value = tokenResponse.data.token

    if (!isValidToken.value) return; 

    const letterResponse = await $api.get(`/v1/letter/getid/no/${letterId}`)

    letterData.value = letterResponse.data.data
    is_sign.value = letterResponse.data.data.is_sign


  } catch (error) {
    console.error('Failed to fetch letter details or users:', error)
  }
})
</script>

