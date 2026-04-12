<template>
  <div>
    <h2
      class="text-lg font-semibold mb-3 text-highlighted flex items-center gap-2"
    >
      <UIcon name="i-lucide-route" />
      Prefixes
      <UBadge size="sm" color="neutral" variant="subtle">{{
        prefixes.length
      }}</UBadge>
    </h2>
    <div class="rounded-xl border border-default overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="text-left bg-elevated">
            <tr>
              <th
                class="px-4 py-2.5 font-medium text-dimmed text-xs uppercase tracking-wide"
              >
                Prefix
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="p in paged"
              :key="p.prefix"
              class="border-t border-default hover:bg-elevated/50 transition-colors"
            >
              <td class="px-4 py-3 font-mono text-base">{{ p.prefix }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="totalPages > 1"
      class="flex items-center justify-between mt-3 px-1"
    >
      <span class="text-sm text-dimmed">
        {{ (page - 1) * perPage + 1 }}–{{
          Math.min(page * perPage, prefixes.length)
        }}
        of {{ prefixes.length }}
      </span>
      <div class="flex items-center gap-1">
        <UButton
          size="xs"
          color="neutral"
          variant="outline"
          icon="i-lucide-chevron-left"
          :disabled="page <= 1"
          @click="page--"
        />
        <span class="text-sm text-dimmed px-2"
          >{{ page }} / {{ totalPages }}</span
        >
        <UButton
          size="xs"
          color="neutral"
          variant="outline"
          icon="i-lucide-chevron-right"
          :disabled="page >= totalPages"
          @click="page++"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  prefixes: { prefix: string; paths: number[][] }[];
}>();

const perPage = 30;
const page = ref(1);
const totalPages = computed(() => Math.ceil(props.prefixes.length / perPage));
const paged = computed(() => {
  const start = (page.value - 1) * perPage;
  return props.prefixes.slice(start, start + perPage);
});
</script>
