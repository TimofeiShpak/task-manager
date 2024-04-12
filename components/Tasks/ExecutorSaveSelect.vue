<template>
    <TaskExecutorSelect
        :value="executor"
        @update="onSelectExecutor"
        menuClass="executor-menu-select"
        selectClass="executor-menu-select"
    />
</template>

<script lang="ts">
import { mapState } from "pinia";
import type { PropType } from "vue"
import type { User, Task } from "~/helpers/types"

export default {
    props: {
        task: {
            type: Object as PropType<Task> | PropType<null>,
        },
    },
    data() {
        return {
            executor: null as User | null,
        };
    },
    computed: {
        ...mapState(useStore, ["getUserById", "currentUser"]),
    },
    methods: {
        onSelectExecutor(value: User) {
            this.executor = value;
            let dto = {
                executor: value.id,
                id: this.task?.id,
                editor: this.currentUser.id,
            };
            Utils.fetchApi.tasks.edit(dto).then((data: { response: Task }) => {
                if (data && data.response) {
                    this.$emit("update", data.response);
                }
            });
        },
    },
    mounted() {
        if (this.task && this.task.executor) {
            const executor = this.getUserById(this.task.executor);
            if (executor) {
                this.executor = executor;
            }
        }
    },
};
</script>

<style lang="scss">
.executor-input-select {
    max-width: 251px;
}

.executor-menu-select {
    max-height: 200px !important;
    width: 251px;
    max-width: 251px;

    .q-item__section .row.user-item {
        gap: 8px;
    }
}
</style>