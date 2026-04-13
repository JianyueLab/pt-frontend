<template>
  <div
    v-if="status === 'pending'"
    class="py-20 flex items-center justify-center gap-2 text-muted"
  >
    <UIcon name="i-lucide-loader-2" class="animate-spin" />
    Loading...
  </div>

  <div v-else-if="error" class="py-20 text-center space-y-3">
    <UIcon name="i-lucide-circle-x" class="text-error text-3xl" />
    <p class="text-error font-medium">Failed to load tag data</p>
    <UButton variant="soft" color="neutral" size="sm" icon="i-lucide-refresh-cw" @click="refresh()">
      Retry
    </UButton>
  </div>

  <div v-else-if="data" class="space-y-6">
    <div class="pb-5 border-b border-default flex items-center gap-3">
      <h1 class="text-3xl font-bold text-highlighted tracking-tight">
        {{ tagLabel }}
      </h1>
      <UBadge :color="tagColor" variant="outline" size="lg">
        {{ data.asns.length }} ASNs
      </UBadge>
    </div>

    <div class="rounded-xl border border-default overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-elevated text-left">
          <tr>
            <th class="px-4 py-2.5 text-xs font-medium text-dimmed uppercase tracking-wide">ASN</th>
            <th class="px-4 py-2.5 text-xs font-medium text-dimmed uppercase tracking-wide">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="entry in data.asns"
            :key="entry.asn"
            class="border-t border-default hover:bg-elevated/50 transition-colors"
          >
            <td class="px-4 py-3 font-mono">
              <NuxtLink :to="`/asn/${entry.asn}`" class="text-primary hover:underline">
                AS{{ entry.asn }}
              </NuxtLink>
            </td>
            <td class="px-4 py-3 font-medium text-highlighted">
              {{ entry.name || entry.org_name || '—' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TAGS, TAG_COLORS } from "~/utils/tags";

const route = useRoute();
const tag = computed(() => route.params.tag as string);
const { data, error, status, refresh } = useTag(tag);

const tagLabel = computed(() => TAGS[Number(tag.value)] ?? `Tag ${tag.value}`);
const tagColor = computed(() => TAG_COLORS[Number(tag.value)] ?? "neutral");

watchEffect(() => {
  if (tagLabel.value) {
    useHead({ title: `${tagLabel.value} | Player Tools` });
  }
});
</script>
