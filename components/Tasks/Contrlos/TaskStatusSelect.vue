<template>
    <InputSelect
        :class="selectClass"
        :value="value"
        inputLabel="Status"
        :menuClass="menuClass"
        :defaultItems="items"
        valueKey="value"
        labelKey="label"
        :isRules="isRules"
        @select="onSelect"
    />
</template>

<script lang="ts">
import { STATUS_TYPE, STATUS_TYPE_NAME } from "~/helpers/constants";
import type { PropType } from "vue";
import type { Status } from "~/helpers/types"

export default {
    props: {
        value: {
            type: Object as PropType<Status> | PropType<null>,
        },
        menuClass: String,
        selectClass: String,
        isRules: Boolean,
    },
    data() {
        return {
            items: (Object.keys(STATUS_TYPE) as Array<keyof typeof STATUS_TYPE>).map((x) => {
                return {
                    value: x,
                    label: STATUS_TYPE_NAME[x],
                };
            }),
        };
    },
    methods: {
        onSelect(value: Status) {
            this.$emit("update", value);
        },
    },
};
</script>

