<template>
    <div class="q-pa-md form-wrapper">
        <div class="text-h6 q-mb-md">{{ title }}</div>
        <q-separator class="q-mb-xl" />

        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div class="form-main">
                <div>
                    <TaskProjectSelect
                        class="q-mb-sm"
                        :value="project"
                        isRules
                        @update="onSelectProject"
                        menuClass="edit-menu-select"
                        selectClass="edit-input-select"
                    />
                    <TaskExecutorSelect
                        :value="executor"
                        isRules
                        @update="onSelectExecutor"
                        menuClass="edit-menu-select edit-menu-select-executor"
                        selectClass="edit-input-select"
                    />
                    <q-input
                        filled
                        v-model="name"
                        label="Name *"
                        lazy-rules
                        class="q-mb-sm"
                        :rules="[Utils.checkByRules]"
                    />
                    <q-input
                        filled
                        v-model="description"
                        label="Description"
                        lazy-rules
                        class="q-mb-sm"
                    />
                </div>
            </div>
            <q-separator class="q-mb-lg" />
            <div class="row">
                <q-btn
                    label="Cancel"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                />
                <q-btn
                    label="Save"
                    type="submit"
                    color="primary"
                    class="q-ml-auto"
                />
            </div>
        </q-form>
    </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";

export default {
    props: {
        item: Object,
        projectData: Object,
    },
    data() {
        return {
            project: null,
            funcApiProject: Utils.fetchApi.projects.getList,
            executor: null,
            funcApiUsers: Utils.fetchApi.users.getUserList,
            name: null,
            description: null,
        };
    },
    computed: {
        ...mapState(useStore, ["currentUser"]),
        isEdit() {
            return !!(this.item && this.item.id);
        },
        title() {
            if (this.isEdit) {
                return "Edit task";
            } else {
                return "Create task";
            }
        },
    },
    methods: {
        ...mapActions(useStore, ["fetchUser"]),
        onSubmit() {
            let dto = {
                projectId: this.project.id,
                executor: this.executor.id,
                name: this.name,
                description: this.description,
            };
            let api = Utils.fetchApi.tasks.edit;
            if (!this.isEdit) {
                api = Utils.fetchApi.tasks.create;
                dto.author = this.currentUser.id;
            } else {
                dto.id = (this.item && this.item.id) || null;
                dto.editor = this.currentUser.id;
            }

            api(dto).then((data) => {
                if (data && data.response) {
                    this.$emit("save", data.response);
                }
            });
        },
        onReset() {
            this.$emit("reset");
        },
        onSelectProject(value) {
            this.project = value;
        },
        onSelectExecutor(value) {
            this.executor = value;
        },
    },
    mounted() {
        if (this.isEdit) {
            this.name = this.item.name || null;
            this.description = this.item.description || null;
            this.project = this.projectData || null;
            if (this.item.executor) {
                this.fetchUser(this.item.executor).then((data) => {
                    if (data && Object.keys(data).length !== 0) {
                        this.executor = data;
                    }
                });
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.form-wrapper {
    min-width: 500px;
    max-width: 500px;
    margin: 0 auto;

    .form-main {
        display: flex;
        gap: 24px;

        & > :first-child {
            flex: 1 1 auto;
        }
    }
}
</style>

<style lang="scss">
.edit-input-select {
    max-width: 468px;
}

.edit-menu-select {
    max-height: 200px !important;
    width: 468px;
    max-width: 468px;
}

.edit-menu-select-executor {
    .q-item__section .row.user-item {
        gap: 8px;
    }
}
</style>