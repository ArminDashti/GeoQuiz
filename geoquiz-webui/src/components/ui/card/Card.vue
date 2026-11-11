<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-sm border border-border bg-card/90 text-card-foreground shadow-none',
        $props.class,
      )
    "
  >
    <slot />
  </div>
</template>
