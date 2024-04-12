<template>
    <div>
        <q-btn-dropdown
            ref="filter"
            outline
            label=""
            dropdown-icon="more_vert"
            class="filter-btn"
        >
            <q-list class="menu-filter">
                <div class="menu-filter-fields">
                    <TaskProjectSelect
                        :value="filter.project"
                        @update="onUpdateProject"
                        menuClass="view-menu-select"
                        selectClass="view-input-select"
                    />
                    <TaskStatusSelect
                        :value="filter.status"
                        @update="onUpdateStatus"
                        menuClass="view-menu-select"
                        selectClass="view-input-select"
                    />
                </div>
                <div class="menu-filter-footer">
                    <q-btn
                        label="Clear"
                        color="primary"
                        @click="clear"
                        flat
                        class="q-ml-sm"
                    />
                    <q-btn
                        label="Apply"
                        color="primary"
                        @click="apply"
                        class="q-ml-auto"
                    />
                </div>
            </q-list>
        </q-btn-dropdown>
    </div>
</template>

<script lang="ts">
import type { PropType } from "vue"
import type { Project, TaskFilter, Status } from "~/helpers/types"

export default {
    props: {
        value: {
            type: Object as PropType<TaskFilter>,
            required: true,
        },
    },
    data() {
        return {
            filter: {
                project: null,
                status: null,
            } as TaskFilter,
        };
    },
    methods: {
        onUpdateProject(value: Project) {
            this.filter.project = value;
        },
        onUpdateStatus(value: Status) {
            this.filter.status = value;
        },
        clear() {
            this.filter = {
                project: null,
                status: null,
            };
            this.apply();
        },
        apply() {
            this.$emit("update", this.filter);
            const filter = this.$refs.filter as any;
            filter.hide();
        },
    },
    mounted() {
        this.filter = Object.assign({}, this.value);
    },
};
</script>

<style lang="scss" scoped>
.filter-btn {
    width: 40px;
    height: 40px;

    &::before {
        border-color: $grey;
    }
}
.menu-filter {
    width: 400px;

    &-footer {
        border-top: 1px solid $grey;
        display: flex;
        padding: 24px;
    }

    &-fields {
        padding: 24px 24px 4px;
    }
}
</style>

<style lang="scss">
.view-input-select {
    width: 352px;
    max-width: 352px;
}

.view-menu-select {
    max-height: 200px !important;
    width: 352px;
    max-width: 352px;
}
</style>