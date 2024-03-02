<template>
    <InputSelect
        :class="selectClass"
        :value="value"
        :funcApi="funcApiProject"
        inputLabel="Project *"
        :menuClass="menuClass"
        clearable
        :isRules="isRules"
        @select="onSelect"
    >
        <template v-slot:option="{ item }">
            <div class="ellipsis-text">#{{ item.code }}</div>
            <div class="ellipsis-text">
                {{ item.name }}
            </div>
        </template>
        <template v-slot:selected-item="{ item }">
            <div class="ellipsis-text">#{{ item.code }}</div>
        </template>
    </InputSelect>
</template>

<script lang="ts">
export default {
    props: {
        value: Object,
        selectClass: String,
        menuClass: String,
        isRules: Boolean,
    },
    data() {
        return {
            funcApiProject: Utils.fetchApi.projects.getList,
        };
    },
    methods: {
        onSelect(value) {
            this.$emit("update", value);
        },
    },
};
</script>

