<template>
  <form @submit.prevent="go" class="flex items-center gap-1">
    <UInput
      v-model="q"
      placeholder="AS number..."
      size="sm"
      color="neutral"
      class="w-36"
      icon="i-lucide-search"
    />
    <UButton
      type="submit"
      size="sm"
      color="primary"
      variant="soft"
      icon="i-lucide-arrow-right"
    />
  </form>
</template>

<script setup lang="ts">
const q = ref("");
const router = useRouter();

function go() {
  const n = parseInt(q.value.trim().replace(/^as/i, ""), 10);
  if (n > 0) {
    router.push(`/asn/${n}`);
    q.value = "";
  }
}
</script>
