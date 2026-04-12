<template>
  <div>
    <h2 class="text-lg font-semibold mb-2 text-highlighted flex items-center gap-2">
      <UIcon name="i-lucide-route" />
      Prefixes ({{ prefixes.length }})
    </h2>
    <div class="border border-default overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="text-left border-b border-default">
          <tr>
            <th class="px-3 py-2 font-medium text-dimmed">Prefix</th>
            <th class="px-3 py-2 font-medium text-dimmed">Type</th>
            <th class="px-3 py-2 font-medium text-dimmed">Path</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in paged" :key="p.prefix" class="border-t border-default hover:bg-muted/5">
            <td class="px-3 py-2 font-mono whitespace-nowrap">{{ p.prefix }}</td>
            <td class="px-3 py-2">
              <UBadge color="neutral" variant="subtle" size="xs">
                {{ p.prefix.includes(":") ? "v6" : "v4" }}
              </UBadge>
            </td>
            <td class="px-3 py-2 font-mono text-xs">
              <div v-for="(path, i) in p.paths" :key="i" class="flex flex-wrap items-center gap-0.5 leading-5">
                <template v-for="(hop, j) in path" :key="j">
                  <UIcon v-if="j" name="i-lucide-chevron-right" class="text-dimmed text-xs" />
                  <NuxtLink v-if="hop" :to="`/asn/${hop}`" class="text-primary hover:underline">AS{{ hop }}</NuxtLink>
                  <span v-else class="text-dimmed">?</span>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-3">
      <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-chevron-left" :disabled="page <= 1" @click="page--" />
      <span class="text-sm text-dimmed">{{ page }} / {{ totalPages }}</span>
      <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-chevron-right" :disabled="page >= totalPages" @click="page++" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ prefixes: { prefix: string; paths: number[][] }[] }>()

const perPage = 30
const page = ref(1)
const totalPages = computed(() => Math.ceil(props.prefixes.length / perPage))
const paged = computed(() => {
  const start = (page.value - 1) * perPage
  return props.prefixes.slice(start, start + perPage)
})
</script>
