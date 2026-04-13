<!-- resources/js/Components/ScrollReveal.vue -->
<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'

    const defaultProps = withDefaults(defineProps<{
        delay?: number
        className?: string
        once?: boolean
        margin?: string
        threshold?: number
    }>(), {
        delay: 0,
        once: true,
        margin: '-100px',
        threshold: 0.1
    })

    const container = ref<HTMLElement | null>(null)
    const isVisible = ref(false)

    // Simple intersection observer based reveal
    let observer: IntersectionObserver | null = null

    onMounted(() => {
        if (!container.value) return

        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    isVisible.value = true
                    if (defaultProps.once && observer) {
                        observer.unobserve(entry.target)
                    }
                } else if (!defaultProps.once) {
                    isVisible.value = false
                }
            },
            {
                rootMargin: defaultProps.margin,
                threshold: defaultProps.threshold
            }
        )

        observer.observe(container.value)
    })

    onUnmounted(() => {
        if (observer) {
            observer.disconnect()
        }
    })
</script>

<template>
    <div ref="container" :class="[
        'transition-all duration-700 ease-out-cubic',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]',
        className
    ]" :style="{ transitionDelay: `${delay}s` }">
        <slot />
    </div>
</template>

<style>

    /* Optional: custom easing that feels similar to framer-motion's [0.4, 0, 0.2, 1] */
    .ease-out-cubic {
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Respect reduced motion preference */
    @media (prefers-reduced-motion: reduce) {
        .transition-all {
            transition: none !important;
        }
    }
</style>



<!-- Basic usage -->
<!-- <ScrollReveal>
  <h2 class="text-4xl">Section Title</h2>
</ScrollReveal> -->

<!-- With delay and custom class -->
<!-- <ScrollReveal :delay="0.2" class="w-full max-w-3xl mx-auto">
  <p class="text-lg leading-relaxed">Some content that slides in...</p>
</ScrollReveal> -->

<!-- Stagger children manually -->
<!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <ScrollReveal v-for="(item, i) in items" :key="item.id" :delay="i * 0.1 + 0.1">
    <ProjectCard :project="item" />
  </ScrollReveal>
</div> -->