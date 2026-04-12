<template>
  <div class="space-y-4">
    <div class="flex items-baseline gap-3 flex-wrap">
      <h1 class="text-2xl font-bold text-highlighted">AS{{ d.asn }}</h1>
      <span v-if="d.name" class="text-lg text-muted">{{ d.name }}</span>
      <span v-if="d.short" class="text-sm text-dimmed">({{ d.short }})</span>
    </div>

    <div v-if="d.tags" class="flex flex-wrap gap-1">
      <TagBadge :tags="d.tags" />
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard label="Prefixes" :value="d.prefix_count" />
      <StatCard label="IPv4" :value="`${d.v4_count} pfx, ${d.v4_size} /24eq`" />
      <StatCard label="IPv6" :value="`${d.v6_count} pfx, ${d.v6_size} /48eq`" />
      <StatCard
        v-if="d.country"
        label="Country"
        :value="d.country"
        icon="i-lucide-map-pin"
      />
    </div>

    <div
      v-if="d.org || d.sponsor_org"
      class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm"
    >
      <div
        v-if="d.org"
        class="p-3 rounded-xl border border-default bg-elevated flex items-start gap-2"
      >
        <UIcon name="i-lucide-building-2" class="text-dimmed mt-0.5 shrink-0" />
        <div>
          <div class="text-dimmed text-xs uppercase tracking-wide mb-1">Org</div>
          <div class="font-medium">{{ d.org.name }}</div>
          <div class="text-dimmed">{{ d.org.handle }}</div>
        </div>
      </div>
      <div
        v-if="d.sponsor_org"
        class="p-3 rounded-xl border border-default bg-elevated flex items-start gap-2"
      >
        <UIcon name="i-lucide-handshake" class="text-dimmed mt-0.5 shrink-0" />
        <div>
          <div class="text-dimmed text-xs uppercase tracking-wide mb-1">Sponsor</div>
          <div class="font-medium">{{ d.sponsor_org.name }}</div>
          <div class="text-dimmed">{{ d.sponsor_org.handle }}</div>
        </div>
      </div>
    </div>

    <a
      v-if="d.website"
      :href="d.website"
      target="_blank"
      rel="noopener"
      class="text-sm text-primary hover:underline inline-flex items-center gap-1"
    >
      <UIcon name="i-lucide-external-link" class="text-xs" />
      {{ d.website }}
    </a>

    <pre
      v-if="d.comments"
      class="text-sm text-muted p-4 rounded-xl border border-default bg-elevated whitespace-pre-wrap font-sans"
      >{{ d.comments }}</pre
    >
  </div>
</template>

<script setup lang="ts">
const { d } = defineProps<{ d: AsnData }>();
</script>
