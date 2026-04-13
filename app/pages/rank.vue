<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-highlighted flex items-center gap-2">
      <UIcon name="i-lucide-bar-chart-3" />
      Rankings
    </h1>

    <UTabs v-model="category" color="neutral" :items="categoryTabs">
      <template #content="{ item }">
        <!-- Prefix tab: keeps its own v4/v6 sub-tabs -->
        <template v-if="item.value === 'prefix'">
          <div
            v-if="prefixStatus === 'pending'"
            class="py-12 flex items-center justify-center gap-2 text-muted"
          >
            <UIcon name="i-lucide-loader-2" class="animate-spin" />
            Loading...
          </div>
          <div v-else-if="prefixError" class="py-12 text-center space-y-2">
            <UIcon name="i-lucide-circle-x" class="text-error text-2xl" />
            <p class="text-error">Failed to load ranking</p>
            <UButton
              variant="soft"
              color="neutral"
              size="sm"
              icon="i-lucide-refresh-cw"
              @click="refreshPrefix()"
              >Retry</UButton
            >
          </div>
          <UTabs
            v-else-if="prefixData"
            v-model="prefixTab"
            color="neutral"
            :items="[
              { label: 'IPv4', value: 'v4' },
              { label: 'IPv6', value: 'v6' },
            ]"
          >
            <template #content="{ item: sub }">
              <RankTable
                :entries="sub.value === 'v4' ? prefixData.v4 : prefixData.v6"
                :type="sub.value as 'v4' | 'v6'"
              />
            </template>
          </UTabs>
        </template>

        <!-- Downstream tab -->
        <template v-else-if="item.value === 'downstream'">
          <div
            v-if="downstreamStatus === 'pending'"
            class="py-12 flex items-center justify-center gap-2 text-muted"
          >
            <UIcon name="i-lucide-loader-2" class="animate-spin" />
            Loading...
          </div>
          <div v-else-if="downstreamError" class="py-12 text-center space-y-2">
            <UIcon name="i-lucide-circle-x" class="text-error text-2xl" />
            <p class="text-error">Failed to load ranking</p>
            <UButton
              variant="soft"
              color="neutral"
              size="sm"
              icon="i-lucide-refresh-cw"
              @click="refreshDownstream()"
              >Retry</UButton
            >
          </div>
          <RelRankTable
            v-else-if="downstreamData"
            :entries="downstreamData"
            label="Downstreams"
          />
        </template>

        <!-- Peer tab -->
        <template v-else-if="item.value === 'peer'">
          <div
            v-if="peerStatus === 'pending'"
            class="py-12 flex items-center justify-center gap-2 text-muted"
          >
            <UIcon name="i-lucide-loader-2" class="animate-spin" />
            Loading...
          </div>
          <div v-else-if="peerError" class="py-12 text-center space-y-2">
            <UIcon name="i-lucide-circle-x" class="text-error text-2xl" />
            <p class="text-error">Failed to load ranking</p>
            <UButton
              variant="soft"
              color="neutral"
              size="sm"
              icon="i-lucide-refresh-cw"
              @click="refreshPeer()"
              >Retry</UButton
            >
          </div>
          <RelRankTable
            v-else-if="peerData"
            :entries="peerData"
            label="Peers"
          />
        </template>

        <!-- AS Cone tab -->
        <template v-else-if="item.value === 'ascone'">
          <div
            v-if="coneStatus === 'pending'"
            class="py-12 flex items-center justify-center gap-2 text-muted"
          >
            <UIcon name="i-lucide-loader-2" class="animate-spin" />
            Loading...
          </div>
          <div v-else-if="coneError" class="py-12 text-center space-y-2">
            <UIcon name="i-lucide-circle-x" class="text-error text-2xl" />
            <p class="text-error">Failed to load ranking</p>
            <UButton
              variant="soft"
              color="neutral"
              size="sm"
              icon="i-lucide-refresh-cw"
              @click="refreshCone()"
              >Retry</UButton
            >
          </div>
          <RelRankTable
            v-else-if="coneData"
            :entries="coneData"
            label="Cone Size"
          />
        </template>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
const categoryTabs = [
  { label: "Prefix", value: "prefix" },
  { label: "Downstream", value: "downstream" },
  { label: "Peer", value: "peer" },
  { label: "AS Cone", value: "ascone" },
];

const category = ref("prefix");
const prefixTab = ref("v4");

const {
  data: prefixData,
  error: prefixError,
  status: prefixStatus,
  refresh: refreshPrefix,
} = useRankPrefix();

const {
  data: downstreamData,
  error: downstreamError,
  status: downstreamStatus,
  refresh: refreshDownstream,
} = useRankDownstream();

const {
  data: peerData,
  error: peerError,
  status: peerStatus,
  refresh: refreshPeer,
} = useRankPeer();

const {
  data: coneData,
  error: coneError,
  status: coneStatus,
  refresh: refreshCone,
} = useRankASCone();
</script>
