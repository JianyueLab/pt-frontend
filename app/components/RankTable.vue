<template>
  <div class="space-y-3 pt-2">
    <div class="rounded-xl border border-default overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="text-left bg-elevated">
            <tr>
              <th
                class="px-4 py-2.5 font-medium text-dimmed text-xs uppercase tracking-wide w-12"
              >
                #
              </th>
              <th
                class="px-4 py-2.5 font-medium text-dimmed text-xs uppercase tracking-wide"
              >
                ASN
              </th>
              <th
                class="px-4 py-2.5 font-medium text-dimmed text-xs uppercase tracking-wide"
              >
                Name
              </th>
              <th
                class="px-4 py-2.5 font-medium text-dimmed text-xs uppercase tracking-wide text-right"
              >
                Prefixes
              </th>
              <th
                class="px-4 py-2.5 font-medium text-dimmed text-xs uppercase tracking-wide text-right"
              >
                {{ type === "v4" ? "/24 eq." : "/48 eq." }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(e, i) in paged"
              :key="e.asn"
              class="border-t border-default hover:bg-elevated/50 transition-colors"
            >
              <td class="px-4 py-2.5 text-dimmed font-mono text-xs">
                {{ (page - 1) * perPage + i + 1 }}
              </td>
              <td class="px-4 py-2.5 font-mono">
                <NuxtLink
                  :to="`/asn/${e.asn}`"
                  class="text-primary hover:underline"
                  >AS{{ e.asn }}</NuxtLink
                >
              </td>
              <td class="px-4 py-2.5">{{ e.name || "-" }}</td>
              <td class="px-4 py-2.5 text-right font-mono">
                {{ fmt(e.prefix_count) }}
              </td>
              <td class="px-4 py-2.5 text-right font-mono">
                {{ fmt(type === "v4" ? e.v4_size : e.v6_size) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="totalPages > 1" class="flex items-center justify-between px-1">
      <span class="text-sm text-dimmed">
        {{ (page - 1) * perPage + 1 }}–{{
          Math.min(page * perPage, entries.length)
        }}
        of {{ entries.length }}
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
const props = defineProps<{ entries: RankEntry[]; type: "v4" | "v6" }>();

const perPage = 20;
const page = ref(1);
const totalPages = computed(() => Math.ceil(props.entries.length / perPage));
const paged = computed(() => {
  const start = (page.value - 1) * perPage;
  return props.entries.slice(start, start + perPage);
});

watch(
  () => props.type,
  () => {
    page.value = 1;
  },
);

const fmt = (n: number) => n.toLocaleString();
</script>
