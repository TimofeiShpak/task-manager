<template>
    <template v-if="isInited">
        <template v-if="isNew">
            <EditTask @save="onSave" @reset="onReset" />
        </template>
        <template v-else-if="isExistData">
            <EditTask
                v-if="isEdit"
                :item="taskData"
                :projectData="projectData"
                @save="onSave"
                @reset="onReset"
            />
            <ViewTask
                v-else
                :task="taskData"
                :project="projectData"
                @update="update"
            />
        </template>
        <template v-else-if="isList">
            <TaskList />
        </template>
    </template>
</template>

<script lang="ts">
import { mapActions } from "pinia";

export default {
    data() {
        return {
            taskData: {},
            projectData: {},
            userData: [],
            isNew: false,
            isEdit: false,
            isInited: false,
            isList: false,
        };
    },
    computed: {
        isExistData() {
            return !!(
                this.isInited &&
                this.taskData &&
                this.taskData.id &&
                this.projectData &&
                this.projectData.id &&
                this.userData &&
                this.userData.length
            );
        },
    },
    methods: {
        ...mapActions(useStore, ["fetchUserList"]),
        fetchTask(id) {
            Utils.fetchApi.tasks.getTask({ id }).then((data) => {
                if (data && data.response) {
                    this.taskData = data.response;
                    if (this.taskData.projectId) {
                        this.fetchProject(this.taskData.projectId);
                    }
                    this.fetchUsers(this.taskData);
                }
            });
        },
        fetchProject(id) {
            Utils.fetchApi.projects.getProject({ id }).then((data) => {
                if (data && data.response) {
                    this.projectData = data.response;
                }
            });
        },
        fetchUsers(task) {
            const uniqIds = new Set();
            ["author", "executor", "editor"].forEach((x) => {
                if (task[x]) {
                    uniqIds.add(task[x]);
                }
            });
            this.fetchUserList([...uniqIds]).then((data) => {
                this.userData = data;
            });
        },
        onSave(value) {
            navigateTo(`/tasks/view/${value.id}`);
        },
        onReset() {
            if (this.isNew) {
                navigateTo("/tasks/list");
            } else {
                navigateTo(`/tasks/view/${this.taskData.id}`);
            }
        },
        update(value) {
            this.taskData = value;
        },
    },
    mounted() {
        const route = useRoute();
        const options = (route.params && route.params.options) || [];
        const [type, id] = options;

        if (type === "list") {
            this.isList = true;
        } else if (type === "new") {
            this.isNew = true;
        } else if (type === "edit") {
            this.isEdit = true;
        }

        if (id) {
            this.fetchTask(id);
        }

        this.isInited = true;
    },
};
</script>
