<template>
  <div>
    <h2 class="text-lg font-semibold mb-2 text-highlighted flex items-center gap-2">
      <UIcon name="i-lucide-git-fork" />
      Relationships
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div v-for="s in sections" :key="s.label" class="border border-default p-3">
        <div class="text-xs text-dimmed mb-2 flex items-center gap-1">
          <UIcon :name="s.icon" class="text-sm" />
          {{ s.label }} ({{ s.asns.length }})
        </div>
        <div v-if="s.asns.length" class="flex flex-wrap gap-x-2 gap-y-1">
          <NuxtLink v-for="a in s.asns" :key="a" :to="`/asn/${a}`" class="text-sm font-mono text-primary hover:underline">
            AS{{ a }}
          </NuxtLink>
        </div>
        <span v-else class="text-dimmed text-sm">None</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ rel: NonNullable<AsnData["relationships"]> }>()

const sections = [
  { label: "Upstream", icon: "i-lucide-arrow-up", get asns() { return props.rel.upstream || [] } },
  { label: "Downstream", icon: "i-lucide-arrow-down", get asns() { return props.rel.downstream || [] } },
  { label: "Peers", icon: "i-lucide-arrow-left-right", get asns() { return props.rel.peers || [] } },
]
</script>
