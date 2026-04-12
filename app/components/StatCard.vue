<template>
  <div class="p-3 border border-default flex items-start gap-3">
    <UIcon v-if="icon" :name="icon" class="text-primary text-lg mt-0.5 shrink-0" />
    <div>
      <div class="text-dimmed text-xs">{{ label }}</div>
      <div class="text-lg font-semibold text-highlighted">{{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string | number; icon?: string }>()
</script>
