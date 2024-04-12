<template>
    <div class="app column">
        <NuxtPage />
        <Preloader />
    </div>
</template>

<script lang="ts">
import "~/helpers/registerIcons";
import { ref } from 'vue'
import type { Ref } from 'vue'

export default {
    setup() {
        const eventResize = ref(null) as Ref<Event> | Ref<null>;
        provide("eventResize", eventResize);

        return {
            eventResize,
        };
    },
    mounted() {
        this.throttleResize = useThrottle(this.handleResize, 100);
        window.addEventListener("resize", this.throttleResize);
    },
    data() {
        return {
            eventScroll: {},
            throttleResize: null as any,
        };
    },
    methods: {
        handleResize(event: Event) {
            this.eventResize = event;
        },
    },
    destroyed() {
        if (this.throttleResize) {
            window.removeEventListener("resize", this.throttleResize);
        }
    },
};
</script>

<style lang="scss" scoped>
.app {
    min-height: 100vh;

    :deep(.danger) {
        color: #ee4222;
    }
    .danger {
        color: #ee4222;
    }
}
</style>

