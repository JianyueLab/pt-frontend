<template>
  <div
    class="min-h-[60vh] flex flex-col items-center justify-center py-20 space-y-8"
  >
    <div class="text-center space-y-3">
      <AppLogo class="h-12 mx-auto" />
      <h1 class="text-4xl font-bold text-highlighted tracking-tight">
        Player Tools
      </h1>
      <p class="text-muted">BGP routing data for AS215172 (MOEDOVE)</p>
    </div>

    <form @submit.prevent="search" class="flex gap-2 w-full max-w-md">
      <UInput
        v-model="q"
        placeholder="AS number (e.g. 215172)"
        size="lg"
        color="neutral"
        class="flex-1"
        icon="i-lucide-search"
      />
      <UButton
        type="submit"
        size="lg"
        color="primary"
        icon="i-lucide-arrow-right"
      >
        Lookup
      </UButton>
    </form>

    <p v-if="count" class="text-sm text-dimmed">
      Tracking
      <span class="text-highlighted font-medium">{{
        count.prefix_count.toLocaleString()
      }}</span>
      prefixes
    </p>
  </div>
</template>

<script setup lang="ts">
const q = ref("");
const router = useRouter();
const { data: count } = usePrefixCount();

function search() {
  const n = parseInt(q.value.trim().replace(/^as/i, ""), 10);
  if (n > 0) router.push(`/asn/${n}`);
}
</script>
