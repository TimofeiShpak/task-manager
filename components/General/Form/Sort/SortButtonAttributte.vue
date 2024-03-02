<template>
    <div class="row sort-wrapper">
        <q-select
            class="sort-select"
            outlined
            v-model="model"
            :options="types"
        />
        <SortButton class="sort-btn" :value="value.type" @input="onSortType" />
    </div>
</template>

<script lang="ts">
import { OPTIONS_SORT } from "~/helpers/constants";

export default {
    props: {
        value: Object,
    },
    data() {
        return {
            types: OPTIONS_SORT,
        };
    },
    computed: {
        model: {
            get() {
                return this.value.attribute;
            },
            set(value) {
                this.$emit("input", {
                    type: this.value.type,
                    attribute: value,
                });
            },
        },
    },
    methods: {
        onSortType(value) {
            this.$emit("input", {
                type: value,
                attribute: this.value.attribute,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.sort-wrapper {
    .sort-select {
        :deep(.q-field__control),
        :deep(.q-field__marginal),
        :deep(.q-field__native) {
            height: 40px;
            min-height: 40px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        :deep(.q-field__control) {
            &::before {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
    }

    .q-btn {
        &::before {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        &:not(:hover)::before {
            border-left: none;
        }
    }
}
</style>