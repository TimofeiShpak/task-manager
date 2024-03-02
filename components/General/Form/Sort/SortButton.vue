<template>
    <q-btn outline @click="onSort" class="sort-btn">
        <Icon :icon="icon" />
    </q-btn>
</template>

<script lang="ts">
import { TYPE_SORT } from "~/helpers/constants";

export default {
    props: {
        value: String,
    },
    computed: {
        icon() {
            if (this.value === TYPE_SORT.DESC) {
                return "sort-up";
            } else {
                return "sort";
            }
        },
    },
    methods: {
        onSort() {
            let newSort = TYPE_SORT.DESC;
            if (this.value === TYPE_SORT.DESC) {
                newSort = TYPE_SORT.ASC;
            }
            this.$emit("input", newSort);
        },
    },
};
</script>

<style lang="scss" scoped>
.sort-btn {
    width: 40px;
    padding: 4px;

    &.q-btn {
        &:not(:hover)::before {
            border-color: $grey;
        }
    }
}
</style>