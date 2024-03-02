<template>
    <div class="q-ml-sm status" :class="status">
        {{ statusName }}
    </div>
</template>

<script lang="ts">
import { STATUS_TYPE_NAME } from "~/helpers/constants";
export default {
    props: {
        item: Object,
    },
    computed: {
        status() {
            return this.item.status;
        },
        statusName() {
            if (this.item.status) {
                return STATUS_TYPE_NAME[this.item.status];
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.status {
    padding: 2px;
    border-radius: 4px;
    color: $secondary;

    &.DRAFT {
        background: $grey;
    }
    &.IN_WORK {
        background: #9e6955;
    }
    &.COMPLETED {
        background: $primary;
    }
}
</style>
