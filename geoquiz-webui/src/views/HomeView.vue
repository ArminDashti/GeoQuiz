<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HeroMap from '@/components/HeroMap.vue'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/useAuth'

const { isAuthenticated, isAdmin } = useAuth()

const destinations = [
  {
    title: 'Flag quiz',
    description: 'Guess the country from its flag.',
    to: '/flag-quiz',
    needsAuth: true,
    ctaAuthed: 'Start flag quiz',
    ctaGuest: 'Log in to play',
  },
  {
    title: 'Map quiz',
    description: 'Name a highlighted country among its neighbors.',
    to: '/mapquiz',
    needsAuth: true,
    ctaAuthed: 'Start map quiz',
    ctaGuest: 'Log in to play',
  },
  {
    title: 'Explore map',
    description: 'Click countries to reveal their names.',
    to: '/map',
    needsAuth: false,
    ctaAuthed: 'Open map',
    ctaGuest: 'Open map',
  },
  {
    title: 'Score board',
    description: 'See who knows the world best.',
    to: '/score-board',
    needsAuth: false,
    ctaAuthed: 'View scores',
    ctaGuest: 'View scores',
  },
] as const
</script>

<template>
  <div class="home-page">
    <section
      class="hero relative isolate min-h-[calc(100dvh-8.5rem)] overflow-hidden atlas-grid"
    >
      <div class="pointer-events-none absolute inset-0 opacity-80 dark:opacity-70">
        <HeroMap />
      </div>
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/30 dark:from-background dark:via-background/82 dark:to-background/25"
      />
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
      />

      <div
        class="hero-content relative z-10 mx-auto flex min-h-[calc(100dvh-8.5rem)] max-w-6xl flex-col justify-center px-4 py-20 sm:px-8"
      >
        <div class="max-w-xl text-left">
          <h1
            class="hero-title font-display text-6xl font-extrabold leading-none tracking-tight text-foreground sm:text-7xl md:text-8xl"
          >
            Geoquiz
          </h1>
          <p class="hero-lead mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
            Learn the world through flags, maps, and play.
          </p>
          <div class="hero-actions mt-8 flex flex-wrap items-center gap-3">
            <template v-if="isAuthenticated">
              <RouterLink to="/flag-quiz">
                <Button size="lg">Start flag quiz</Button>
              </RouterLink>
              <RouterLink to="/map">
                <Button size="lg" variant="outline">Explore map</Button>
              </RouterLink>
            </template>
            <template v-else>
              <RouterLink to="/signup">
                <Button size="lg">Sign up</Button>
              </RouterLink>
              <RouterLink to="/login">
                <Button size="lg" variant="outline">Log in</Button>
              </RouterLink>
              <RouterLink to="/map">
                <Button size="lg" variant="ghost">Explore map</Button>
              </RouterLink>
            </template>
          </div>
        </div>
      </div>
    </section>

    <section class="relative mx-auto max-w-6xl px-4 pb-16 pt-2 sm:px-8">
      <div class="max-w-xl">
        <h2 class="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Ways to play
        </h2>
        <p class="mt-2 text-sm text-muted-foreground sm:text-base">
          Pick a quiz or open the interactive map.
        </p>
      </div>

      <ul class="mt-8 divide-y divide-border border-y border-border" role="list">
        <li v-for="item in destinations" :key="item.to">
          <div
            class="group flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div class="min-w-0">
              <p class="font-display text-lg font-semibold tracking-tight text-foreground">
                {{ item.title }}
              </p>
              <p class="mt-0.5 text-sm text-muted-foreground">
                {{ item.description }}
              </p>
            </div>
            <RouterLink :to="item.to" class="shrink-0">
              <Button
                :variant="item.needsAuth && !isAuthenticated ? 'outline' : 'default'"
                :disabled="item.needsAuth && !isAuthenticated"
              >
                {{
                  isAuthenticated || !item.needsAuth ? item.ctaAuthed : item.ctaGuest
                }}
              </Button>
            </RouterLink>
          </div>
        </li>
      </ul>

      <div v-if="isAdmin" class="pt-6">
        <RouterLink to="/admin">
          <Button variant="outline">Admin invite code</Button>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-title,
.hero-lead,
.hero-actions {
  animation: hero-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-lead {
  animation-delay: 0.1s;
}

.hero-actions {
  animation-delay: 0.2s;
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-title,
  .hero-lead,
  .hero-actions {
    animation: none;
  }
}
</style>
