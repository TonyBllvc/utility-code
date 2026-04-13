<!-- resources/js/Components/ScrollIndicator.vue -->
<script setup lang="ts">
    import { ChevronDown } from 'lucide-vue-next'

    const scrollToNext = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        })
    }
</script>

<template>
    <button type="button"
        class="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full p-1"
        aria-label="Scroll to content" @click="scrollToNext">
        <span class="text-xs font-light tracking-widest uppercase">Scroll</span>
        <ChevronDown class="size-5 animate-bounce" />
    </button>
</template>