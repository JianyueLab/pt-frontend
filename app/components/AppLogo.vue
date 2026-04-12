<template>
  <img :src="useColorMode().value === 'dark' ? white : color" alt="JianYueLab" v-bind="$attrs" />
</template>

<script setup lang="ts">
import color from "~/assets/images/svg/Color logo - no background.svg"
import white from "~/assets/images/svg/White logo - no background.svg"
defineOptions({ inheritAttrs: false })
</script>
