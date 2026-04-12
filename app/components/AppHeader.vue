<template>
  <header class="border-b border-default bg-default">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
      <NuxtLink to="/">
        <AppLogo class="h-6" />
      </NuxtLink>
      <nav class="flex items-center gap-1">
        <UButton to="/" variant="ghost" color="neutral" size="sm" icon="i-lucide-home">Home</UButton>
        <UButton to="/rank" variant="ghost" color="neutral" size="sm" icon="i-lucide-bar-chart-3">Ranking</UButton>
      </nav>
      <UColorModeButton class="ml-auto" color="neutral" />
    </div>
  </header>
</template>
