<template>
    <template v-if="isInited">
        <Navigation />
        <div class="page-content column">
            <NuxtPage />
        </div>
    </template>
</template>

<script lang="ts">
import { mapActions } from "pinia";
export default {
    data() {
        return {
            isInited: false,
        };
    },
    methods: {
        ...mapActions(useStore, ["getCurrentUser"]),
    },
    mounted() {
        this.getCurrentUser().finally(() => {
            this.isInited = true;
        });
    },
};
</script>

<style lang="scss" scoped>
.page-content {
    padding: 24px;
    flex: 1 1 auto;
    max-width: 100%;
    min-width: 1%;
}
</style>