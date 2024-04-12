<template>
    <div class="task">
        <div class="task-main">
            <div class="task-main-header">
                <div class="task-top">
                    <div class="task-code">{{ textCode }}</div>
                    <DropDownButtonTask
                        v-if="canEdit"
                        :task="task"
                        @deleteTask="deleteTask"
                    />
                </div>

                <div class="task-name">{{ task.name }}</div>
                <div class="row sub-info">
                    <TaskStatus :item="task" />
                    <div class="text-grey">{{ createdText }}</div>
                    <div class="row user-item" v-if="author">
                        <Avatar :user="author" />
                        <div class="ellipsis-text">
                            {{ author.name }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="task-main-content"
                v-if="task.description || editedText || editor"
            >
                <div v-if="task.description">{{ task.description }}</div>
                <div class="row sub-info" v-if="editedText || editor">
                    <div class="text-grey" v-if="editedText">
                        {{ editedText }}
                    </div>
                    <div class="row user-item" v-if="editor">
                        <Avatar :user="editor" />
                        <div class="ellipsis-text">
                            {{ editor.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="task-asside" v-if="isExecutor || canEdit">
            <div class="task-asside-field" v-if="canEdit">
                <ExecutorSaveSelect :task="task" @update="update" />
            </div>
            <div class="task-asside-field" v-if="isExecutor || canEdit">
                <StatusSaveSelect :task="task" @updateStatus="update" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import type { PropType } from "vue"
import type { Task } from "~/helpers/types"

export default {
    props: {
        task: {
            type: Object as PropType<Task>,
            required: true
        },
        project: Object,
    },
    computed: {
        ...mapState(useStore, ["getUserById", "isAdmin", "currentUser"]),
        textCode() {
            if (this.project && this.project.code) {
                return `Code: #${this.project.code}`;
            }
        },
        createdText() {
            if (this.task.dateCreated) {
                const date = Utils.dateToString(this.task.dateCreated);
                if (date) {
                    return `Created ${date}`;
                }
            }
        },
        author() {
            if (this.task.author) {
                const author = this.getUserById(this.task.author);
                return author || null;
            } else {
                return null
            }
        },
        editedText() {
            if (this.task.dateEdited) {
                const date = Utils.dateToString(this.task.dateEdited);
                if (date) {
                    return `Edited ${date}`;
                }
            }
        },
        editor() {
            if (this.task.editor) {
                const editor = this.getUserById(this.task.editor);
                return editor || null;
            } else {
                return null
            }
        },
        isAuthor() {
            return this.task.author === this.currentUser.id;
        },
        isExecutor() {
            return this.task.executor === this.currentUser.id;
        },
        canEdit() {
            return this.isAdmin || this.isAuthor;
        },
    },
    methods: {
        deleteTask() {
            navigateTo("/tasks/list");
        },
        update(value: Task) {
            this.$emit("update", value);
        },
    },
};
</script>

<style lang="scss" scoped>
.task {
    display: flex;
    border: 1px solid $grey;
    border-radius: 4px;

    &-main {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;

        &-header,
        &-content {
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 24px;
        }

        &-content {
            border-top: 1px solid $grey;
        }
    }

    &-top {
        display: flex;
    }

    &-code {
        font-size: 24px;
        margin-right: auto;
    }

    &-name {
        font-size: 24px;
    }

    .sub-info {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .user-item {
        gap: 8px;
    }

    &-asside {
        width: 300px;
        min-width: 300px;
        padding: 24px 24px 4px;
        border-left: 1px solid $grey;

        &-field {
            &:not(:last-child) {
                margin-bottom: 24px;
                border-bottom: 1px solid $grey;
            }
        }
    }
}
</style>