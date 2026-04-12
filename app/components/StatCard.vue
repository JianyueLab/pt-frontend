<template>
  <div
    class="p-4 rounded-xl border border-default bg-elevated flex items-start gap-3"
  >
    <UIcon
      v-if="icon"
      :name="icon"
      class="text-primary text-xl mt-0.5 shrink-0"
    />
    <div>
      <div class="text-dimmed text-xs uppercase tracking-wide mb-1">
        {{ label }}
      </div>
      <div class="text-xl font-semibold text-highlighted">{{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string | number; icon?: string }>();
</script>
