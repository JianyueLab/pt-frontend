<template>
  <UBadge
    v-for="id in parseTags(tags)"
    :key="id"
    :color="TAG_COLORS[id] ?? 'neutral'"
    variant="outline"
    size="md"
  >
    {{ TAGS[id] }}
  </UBadge>
</template>

<script setup lang="ts">
import { TAGS, TAG_COLORS, parseTags } from "~/utils/tags";
defineProps<{ tags: string }>();
</script>
