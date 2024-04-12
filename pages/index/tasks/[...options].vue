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
import type { Task, Project, User } from "~/helpers/types"

export default {
    data() {
        return {
            taskData: {} as Task,
            projectData: {} as Project,
            userData: [] as Array<User>,
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
        fetchTask(id: string) {
            Utils.fetchApi.tasks.getTask({ id }).then((data: { response: Task }) => {
                if (data && data.response) {
                    this.taskData = data.response;
                    if (this.taskData.projectId) {
                        this.fetchProject(this.taskData.projectId);
                    }
                    this.fetchUsers(this.taskData);
                }
            });
        },
        fetchProject(id: string) {
            Utils.fetchApi.projects.getProject({ id }).then((data: { response: Project }) => {
                if (data && data.response) {
                    this.projectData = data.response;
                }
            });
        },
        fetchUsers(task: Task) {
            const uniqIds = new Set<string>();
            ["author", "executor", "editor"].forEach((x) => {
                if (task[x as keyof Task]) {
                    uniqIds.add(`${task[x as keyof Task]}`);
                }
            });
            this.fetchUserList([...uniqIds]).then((data: Array<User>) => {
                this.userData = data;
            });
        },
        onSave(value: Task) {
            navigateTo(`/tasks/view/${value.id}`);
        },
        onReset() {
            if (this.isNew) {
                navigateTo("/tasks/list");
            } else {
                navigateTo(`/tasks/view/${this.taskData.id}`);
            }
        },
        update(value: Task) {
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
