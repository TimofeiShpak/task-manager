<template>
    <TaskStatusSelect
        :value="status"
        @update="onSelect"
        menuClass="status-menu-select"
        selectClass="status-menu-select"
    />
</template>

<script lang="ts">
import { STATUS_TYPE_NAME } from "~/helpers/constants";
import { mapState } from "pinia";
import type { PropType } from "vue"
import type { Task, Status } from "~/helpers/types"

export default {
    props: {
        task: {
            type: Object as PropType<Task> | PropType<null>,
        },
    },
    data() {
        return {
            status: null as Status | null,
        };
    },
    computed: {
        ...mapState(useStore, ["currentUser"]),
    },
    methods: {
        onSelect(value: Status) {
            this.status = value;
            let dto = {
                status: this.status.value,
                id: this.task?.id,
                editor: this.currentUser.id,
            };
            Utils.fetchApi.tasks.edit(dto).then((data: { response: Status }) => {
                if (data && data.response) {
                    this.$emit("updateStatus", data.response);
                }
            });
        },
    },
    mounted() {
        if (this.task && this.task.status) {
            this.status = {
                value: this.task.status,
                label: STATUS_TYPE_NAME[this.task.status],
            };
        }
    },
};
</script>

<style lang="scss">
.status-input-select {
    max-width: 251px;
}

.status-menu-select {
    max-height: 200px !important;
    width: 251px;
    max-width: 251px;

    .q-item__section .row.user-item {
        gap: 8px;
    }
}
</style>

