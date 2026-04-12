<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-highlighted flex items-center gap-2">
      <UIcon name="i-lucide-bar-chart-3" />
      Prefix Ranking
    </h1>

    <div v-if="status === 'pending'" class="py-12 flex items-center justify-center gap-2 text-muted">
      <UIcon name="i-lucide-loader-2" class="animate-spin" />
      Loading...
    </div>

    <div v-else-if="error" class="py-12 text-center space-y-2">
      <UIcon name="i-lucide-circle-x" class="text-error text-2xl" />
      <p class="text-error">Failed to load ranking</p>
      <UButton variant="soft" color="neutral" size="sm" icon="i-lucide-refresh-cw" @click="refresh()">Retry</UButton>
    </div>

    <UTabs v-else-if="data" v-model="tab" color="neutral" :items="[{ label: 'IPv4', value: 'v4' }, { label: 'IPv6', value: 'v6' }]">
      <template #content="{ item }">
        <RankTable :entries="item.value === 'v4' ? data.v4 : data.v6" :type="item.value as 'v4' | 'v6'" />
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
const { data, error, status, refresh } = useRankPrefix()
const tab = ref("v4")
</script>
