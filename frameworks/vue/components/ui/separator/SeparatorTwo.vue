<!-- resources/js/Components/Separator.vue -->
<script setup lang="ts">
    import { cn } from '@/composables/useClassName';


    interface Props extends Record<string, any> {
        /** Horizontal or vertical orientation */
        orientation?: 'horizontal' | 'vertical'
        /** Whether this is purely decorative (affects accessibility) */
        decorative?: boolean
        class?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        orientation: 'horizontal',
        decorative: true,
    })
</script>

<template>
    <div :role="props.decorative ? 'none' : 'separator'"
        :aria-orientation="props.decorative ? undefined : props.orientation" :class="cn(
            'shrink-0 bg-border',
            props.orientation === 'horizontal'
                ? 'h-[1px] w-full'
                : 'h-full w-[1px]',
            props.class
        )" v-bind="$attrs" />
</template>


<!-- Horizontal separator (default) -->
<!-- <Separator /> -->

<!-- With extra classes -->
<!-- <Separator class="my-8" /> -->

<!-- Vertical separator -->
<!-- <Separator orientation="vertical" class="h-12 mx-4" /> -->

<!-- Non-decorative (for screen readers) -->
<!-- <Separator :decorative="false" /> -->