<template>
  <NuxtLink
    v-for="id in parseTags(tags)"
    :key="id"
    :to="`/tag/${id}`"
  >
    <UBadge
      :color="TAG_COLORS[id] ?? 'neutral'"
      variant="outline"
      size="md"
      class="cursor-pointer hover:opacity-80 transition-opacity"
    >
      {{ TAGS[id] }}
    </UBadge>
  </NuxtLink>
</template>

<script setup lang="ts">
import { TAGS, TAG_COLORS, parseTags } from "~/utils/tags";
defineProps<{ tags: string }>();
</script>
