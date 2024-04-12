<template>
    <div>
        <NuxtLink :to="link.to">{{ link.name }}</NuxtLink>
    </div>
</template>

<script lang="ts">
import type { PropType } from "vue"
import type { Link } from "~/helpers/types"

export default {
    props: {
        link: {
            type: Object as PropType<Link>,
            required: true,
        },
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