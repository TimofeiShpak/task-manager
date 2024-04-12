<template>
    <InputSelect
        class="q-mb-sm"
        :class="selectClass"
        :value="value"
        :funcApi="funcApiUsers"
        inputLabel="Executor"
        :menuClass="menuClass"
        :isRules="isRules"
        @select="onSelect"
    >
        <template v-slot:option="{ item }">
            <div class="row user-item">
                <Avatar :user="item" />
                <div class="ellipsis-text">
                    {{ item.name }}
                </div>
            </div>
        </template>
        <template v-slot:selected-item="{ item }">
            <div class="ellipsis-text">
                {{ item.name }}
            </div>
        </template>
    </InputSelect>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { User } from "~/helpers/types"

export default {
    props: {
        value: {
            type: Object as PropType<User> | PropType<null>,
        },
        selectClass: String,
        menuClass: String,
        isRules: Boolean,
    },
    data() {
        return {
            funcApiUsers: Utils.fetchApi.users.getUserList,
        };
    },
    methods: {
        onSelect(value: User) {
            this.$emit("update", value);
        },
    },
};
</script>

