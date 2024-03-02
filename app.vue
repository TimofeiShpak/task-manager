<template>
    <div class="app column">
        <NuxtPage />
        <Preloader />
    </div>
</template>

<script lang="ts">
import { mapActions } from "pinia";
import "~/helpers/registerIcons";

export default {
    setup() {
        const eventResize = ref(0);
        provide("eventResize", eventResize);

        return {
            eventResize,
        };
    },
    mounted() {
        this.throttleResize = _.throttle(this.handleResize, 100);
        window.addEventListener("resize", this.throttleResize);
    },
    data() {
        return {
            eventScroll: {},
        };
    },
    methods: {
        ...mapActions(useStore, ["windowResize"]),
        handleResize(event) {
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

