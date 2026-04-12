<template>
  <div v-if="status === 'pending'" class="py-20 flex items-center justify-center gap-2 text-muted">
    <UIcon name="i-lucide-loader-2" class="animate-spin" />
    Loading...
  </div>

  <div v-else-if="error" class="py-20 text-center space-y-3">
    <UIcon name="i-lucide-circle-x" class="text-error text-3xl" />
    <p class="text-error font-medium">Failed to load ASN data</p>
    <UButton variant="soft" color="neutral" size="sm" icon="i-lucide-refresh-cw" @click="refresh()">
      Retry
    </UButton>
  </div>

  <div v-else-if="data" class="space-y-6">
    <!-- Page header -->
    <div class="pb-5 border-b border-default">
      <h1 class="text-3xl font-bold text-highlighted tracking-tight">{{ displayName }}</h1>
      <div class="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2 text-sm text-muted">
        <span>AS Number <strong class="text-highlighted">{{ data.asn }}</strong></span>
        <a
          v-if="data.website"
          :href="data.website"
          target="_blank"
          rel="noopener"
          class="text-primary hover:underline inline-flex items-center gap-1"
        >
          <UIcon name="i-lucide-external-link" class="text-xs" />
          {{ data.website }}
        </a>
      </div>
    </div>

    <!-- Tabs -->
    <UTabs :items="tabs" default-value="overview" color="neutral">
      <template #content="{ item }">

        <!-- Overview tab -->
        <div v-if="item.value === 'overview'" class="pt-5 space-y-8">

          <!-- Info grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
            <div v-if="data.org">
              <div class="text-dimmed text-xs uppercase tracking-wide mb-1">Organisation</div>
              <div class="font-medium text-base">{{ data.org.name }}</div>
              <div class="text-dimmed text-sm">{{ data.org.handle }}</div>
            </div>
            <div>
              <div class="text-dimmed text-xs uppercase tracking-wide mb-1">Prefixes Originated</div>
              <div class="font-medium text-base">{{ data.v4_count }} IPv4, {{ data.v6_count }} IPv6</div>
            </div>
            <div v-if="data.country">
              <div class="text-dimmed text-xs uppercase tracking-wide mb-1">Country</div>
              <div class="font-medium text-base">{{ data.country }}</div>
            </div>
            <div v-if="data.sponsor_org">
              <div class="text-dimmed text-xs uppercase tracking-wide mb-1">Sponsor</div>
              <div class="font-medium text-base">{{ data.sponsor_org.name }}</div>
              <div class="text-dimmed text-sm">{{ data.sponsor_org.handle }}</div>
            </div>
          </div>

          <USeparator />

          <!-- Rankings + Tags side by side -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h2 class="text-xl font-bold text-highlighted mb-3">Rankings</h2>
              <template v-if="rankStatus === 'pending'">
                <p class="text-base text-dimmed">Loading...</p>
              </template>
              <template v-else-if="v4Rank || v6Rank">
                <ul class="space-y-2">
                  <li v-if="v4Rank" class="text-base">
                    <span class="text-dimmed">#{{ v4Rank }}</span>
                    <span class="text-muted ml-1">for IPv4 prefix count</span>
                  </li>
                  <li v-if="v6Rank" class="text-base">
                    <span class="text-dimmed">#{{ v6Rank }}</span>
                    <span class="text-muted ml-1">for IPv6 prefix count</span>
                  </li>
                </ul>
              </template>
              <p v-else class="text-base text-dimmed">Not ranked</p>
            </div>

            <div v-if="data.tags">
              <h2 class="text-xl font-bold text-highlighted mb-3">Tags</h2>
              <div class="flex flex-wrap gap-2">
                <TagBadge :tags="data.tags" />
              </div>
            </div>
          </div>

          <!-- Comments -->
          <pre
            v-if="data.comments"
            class="text-sm text-muted p-4 rounded-xl border border-default bg-elevated whitespace-pre-wrap font-sans"
          >{{ data.comments }}</pre>

        </div>

        <!-- Connectivity tab -->
        <div v-else-if="item.value === 'connectivity'" class="pt-5 space-y-8">

          <!-- Summary bar -->
          <div v-if="data.relationships" class="flex gap-8 pb-5 border-b border-default">
            <div>
              <div class="text-2xl font-bold text-highlighted">{{ data.relationships.upstream_count }}</div>
              <div class="text-sm text-dimmed">Upstreams</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-highlighted">{{ data.relationships.peer_count }}</div>
              <div class="text-sm text-dimmed">Peers</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-highlighted">{{ data.relationships.downstream_count }}</div>
              <div class="text-sm text-dimmed">Downstreams</div>
            </div>
          </div>

          <!-- Upstreams table -->
          <div v-if="data.relationships?.upstream.length">
            <h2 class="text-xl font-bold text-highlighted mb-4">Upstreams</h2>
            <div class="rounded-xl border border-default overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-elevated text-left">
                  <tr>
                    <th class="px-4 py-2.5 text-xs font-medium text-dimmed uppercase tracking-wide">ASN</th>
                    <th class="px-4 py-2.5 text-xs font-medium text-dimmed uppercase tracking-wide">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="a in data.relationships.upstream" :key="a" class="border-t border-default hover:bg-elevated/50 transition-colors">
                    <td class="px-4 py-3 font-mono">
                      <NuxtLink :to="`/asn/${a}`" class="text-primary hover:underline">AS{{ a }}</NuxtLink>
                    </td>
                    <td class="px-4 py-3 text-muted">{{ asnInfo(a).name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Peers table -->
          <div v-if="data.relationships?.peers.length">
            <h2 class="text-xl font-bold text-highlighted mb-4">Peers</h2>
            <div class="rounded-xl border border-default overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-elevated text-left">
                  <tr>
                    <th class="px-4 py-2.5 text-xs font-medium text-dimmed uppercase tracking-wide">ASN</th>
                    <th class="px-4 py-2.5 text-xs font-medium text-dimmed uppercase tracking-wide">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="a in data.relationships.peers" :key="a" class="border-t border-default hover:bg-elevated/50 transition-colors">
                    <td class="px-4 py-3 font-mono">
                      <NuxtLink :to="`/asn/${a}`" class="text-primary hover:underline">AS{{ a }}</NuxtLink>
                    </td>
                    <td class="px-4 py-3 text-muted">{{ asnInfo(a).name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Downstreams table -->
          <div v-if="data.relationships?.downstream.length">
            <h2 class="text-xl font-bold text-highlighted mb-4">Downstreams</h2>
            <div class="rounded-xl border border-default overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-elevated text-left">
                  <tr>
                    <th class="px-4 py-2.5 text-xs font-medium text-dimmed uppercase tracking-wide">ASN</th>
                    <th class="px-4 py-2.5 text-xs font-medium text-dimmed uppercase tracking-wide">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="a in data.relationships.downstream" :key="a" class="border-t border-default hover:bg-elevated/50 transition-colors">
                    <td class="px-4 py-3 font-mono">
                      <NuxtLink :to="`/asn/${a}`" class="text-primary hover:underline">AS{{ a }}</NuxtLink>
                    </td>
                    <td class="px-4 py-3 text-muted">{{ asnInfo(a).name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- Prefixes tab -->
        <div v-else-if="item.value === 'prefixes'" class="pt-5 space-y-5">
          <div class="flex flex-wrap justify-between gap-6 pb-5 border-b border-default">
            <div>
              <div class="text-sm text-dimmed mb-0.5">Prefixes Originated</div>
              <div class="font-semibold text-base">{{ data.v4_count }} IPv4, {{ data.v6_count }} IPv6</div>
            </div>
            <div class="text-right">
              <div class="text-sm text-dimmed mb-0.5">Addresses Originated</div>
              <div class="font-semibold text-base">{{ data.v4_size.toLocaleString() }} /24's of IPv4</div>
              <div class="font-semibold text-base">{{ data.v6_size.toLocaleString() }} /48's of IPv6</div>
            </div>
          </div>
          <PrefixTable :prefixes="data.prefixes" />
        </div>

      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const asn = computed(() => route.params.asn as string);
const { data, error, status, refresh } = useAsn(asn);
const { data: rankData, status: rankStatus } = useRankPrefix();

const displayName = computed(() => {
  if (!data.value) return "";
  return data.value.name || data.value.org?.name || `AS${data.value.asn}`;
});

watchEffect(() => {
  if (data.value) {
    useHead({ title: `AS${data.value.asn} — ${displayName.value} | Player Tools` });
  }
});

const v4Rank = computed(() => {
  if (!rankData.value || !data.value) return null;
  const idx = rankData.value.v4.findIndex((e) => e.asn === data.value!.asn);
  return idx >= 0 ? idx + 1 : null;
});

const v6Rank = computed(() => {
  if (!rankData.value || !data.value) return null;
  const idx = rankData.value.v6.findIndex((e) => e.asn === data.value!.asn);
  return idx >= 0 ? idx + 1 : null;
});

const asnInfoMap = computed(() => {
  const map = new Map<number, { name: string; v4: boolean; v6: boolean }>();
  if (rankData.value) {
    for (const e of [...rankData.value.v4, ...rankData.value.v6]) {
      if (!map.has(e.asn)) map.set(e.asn, { name: e.name ?? "", v4: e.v4_count > 0, v6: e.v6_count > 0 });
    }
  }
  return map;
});

const asnInfo = (n: number) => {
  const entry = asnInfoMap.value.get(n);
  return entry ? { known: true, ...entry } : { known: false, name: "", v4: false, v6: false };
};

const tabs = computed(() => {
  const t: { label: string; value: string }[] = [{ label: "Overview", value: "overview" }];
  if (data.value?.relationships) {
    t.push({ label: "Connectivity", value: "connectivity" });
  }
  if (data.value?.prefixes?.length) {
    t.push({ label: `Prefixes (${data.value.prefixes.length})`, value: "prefixes" });
  }
  return t;
});
</script>
