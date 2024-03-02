<template>
    <div>
        <NuxtLink :to="link.to">{{ link.name }}</NuxtLink>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        link: Object,
    },
};
</script>

<style lang="scss" scoped>
div {
    margin-right: 16px;

    a {
        padding: 4px 16px;
        text-decoration: none;
        border-radius: 4px;
        border: 1px solid $secondary;

        &,
        &:visited {
            color: $secondary;
        }

        &.router-link-active {
            color: #1c1c1c;
            background-color: $secondary;
        }
    }
}
</style>