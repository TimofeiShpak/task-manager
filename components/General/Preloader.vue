<template>
    <div v-if="isPreloader">
        <div class="loader-wrapper">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    mounted() {},
    computed: {
        isPreloader() {
            const { $isPreloader } = useNuxtApp();
            return $isPreloader.value;
        },
    },
};
</script>


<style lang="scss" scoped>
.loader {
    width: 40px;
    height: 40px;
    border: 5px solid #ececec;
    border-bottom-color: $primary;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    &-wrapper {
        z-index: 9999;
        border: none;
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background-color: #f5f5f5;
        opacity: 0.6;
        cursor: wait;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>