<template>
  <div class="py-16 text-center space-y-6">
    <AppLogo class="h-10 mx-auto" />
    <h1 class="text-3xl font-bold text-highlighted">Player Tools</h1>
    <p class="text-muted">BGP routing data for AS215172 (MOEDOVE)</p>

    <form @submit.prevent="search" class="flex justify-center gap-2">
      <UInput v-model="q" placeholder="AS number (e.g. 215172)" size="lg" color="neutral" class="w-72" icon="i-lucide-search" />
      <UButton type="submit" size="lg" color="primary" variant="solid" icon="i-lucide-arrow-right">Lookup</UButton>
    </form>

    <p v-if="count" class="text-sm text-dimmed">Tracking {{ count.prefix_count }} prefixes</p>
  </div>
</template>

<script setup lang="ts">
const q = ref("")
const router = useRouter()
const { data: count } = usePrefixCount()

function search() {
  const n = parseInt(q.value.trim().replace(/^as/i, ""), 10)
  if (n > 0) router.push(`/asn/${n}`)
}
</script>
