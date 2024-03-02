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
export default {
    props: {
        value: Object,
    },
    data() {
        return {
            filter: {
                project: null,
                status: null,
            },
        };
    },
    methods: {
        onUpdateProject(value) {
            this.filter.project = value;
        },
        onUpdateStatus(value) {
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
            this.$refs.filter.hide();
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