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

export default {
    props: {
        value: Object,
        menuClass: String,
        selectClass: String,
        isRules: Boolean,
    },
    data() {
        return {
            items: Object.keys(STATUS_TYPE).map((x) => {
                return {
                    value: x,
                    label: STATUS_TYPE_NAME[x],
                };
            }),
        };
    },
    methods: {
        onSelect(value) {
            this.$emit("update", value);
        },
    },
};
</script>

