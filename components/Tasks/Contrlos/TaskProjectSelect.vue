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
import type { PropType } from "vue";
import type { Project } from "~/helpers/types";

export default {
    props: {
        value: { 
            type: Object as PropType<Project> | PropType<null>,
        },
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
        onSelect(value: Project) {
            this.$emit("update", value);
        },
    },
};
</script>

