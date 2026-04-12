<template>
  <div v-if="status === 'pending'" class="py-12 flex items-center justify-center gap-2 text-muted">
    <UIcon name="i-lucide-loader-2" class="animate-spin" />
    Loading...
  </div>

  <div v-else-if="error" class="py-12 text-center space-y-2">
    <UIcon name="i-lucide-circle-x" class="text-error text-2xl" />
    <p class="text-error">Failed to load ASN data</p>
    <UButton variant="soft" color="neutral" size="sm" icon="i-lucide-refresh-cw" @click="refresh()">Retry</UButton>
  </div>

  <div v-else-if="data" class="space-y-6">
    <AsnInfo :d="data" />
    <RelationshipList v-if="data.relationships" :rel="data.relationships" />
    <PrefixTable v-if="data.prefixes?.length" :prefixes="data.prefixes" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const asn = computed(() => route.params.asn as string)
const { data, error, status, refresh } = useAsn(asn)
</script>
