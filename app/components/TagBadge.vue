<template>
  <UBadge v-for="id in parseTags(tags)" :key="id" color="neutral" variant="subtle" size="sm">
    {{ TAGS[id] }}
  </UBadge>
</template>

<script setup lang="ts">
import { TAGS, parseTags } from "~/utils/tags"
defineProps<{ tags: string }>()
</script>
