<template>
    <div class="item">
        <q-item clickable @click="goToItem">
            <q-item-section>
                <q-item-label>
                    <div
                        class="ellipsis-text-lines"
                        ref="name"
                        v-html="getTextWithSelection"
                    ></div>
                    <q-tooltip max-width="80%" v-if="tooltipName">
                        #{{ item.name }}
                    </q-tooltip>
                </q-item-label>
                <q-item-label class="row sub-info">
                    <div class="ellipsis-text">
                        <div class="ellipsis-text" ref="code">
                            #{{ codeValue }}
                        </div>
                        <q-tooltip max-width="80%" v-if="tooltipCode">
                            #{{ codeValue }}
                        </q-tooltip>
                    </div>
                    <div class="q-ml-sm text-grey">{{ authorText }}</div>
                    <div class="q-ml-auto text-grey">{{ editorText }}</div>
                </q-item-label>
            </q-item-section>
            <q-item-section side v-if="canEdit">
                <div class="text-grey-8 q-gutter-xs">
                    <q-btn-dropdown
                        flat
                        label=""
                        dropdown-icon="more_vert"
                        class="item-btn"
                        @click.stop
                    >
                        <q-list>
                            <q-item
                                clickable
                                v-close-popup
                                @click.stop="editItem"
                            >
                                <q-item-section>
                                    <q-item-label>Edit</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item
                                clickable
                                v-close-popup
                                @click.stop="changeConfirm(true)"
                            >
                                <q-item-section>
                                    <q-item-label class="danger">
                                        Delete
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </div>
            </q-item-section>
        </q-item>
        <q-separator />
        <Confirm
            class="modal-view"
            :isOpen="isOpenConfirm"
            @input="changeConfirm"
            @confirm="deleteItem"
        >
            <div>
                Are you sure you want to
                <span class="danger">delete</span> project?
            </div>
        </Confirm>
    </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";

export default {
    inject: ["eventResize"],
    props: {
        item: Object,
        searchText: String,
    },
    data() {
        return {
            tooltipCode: false,
            tooltipName: false,
            isOpenConfirm: false,
        };
    },
    computed: {
        ...mapState(useStore, ["getUserById", "isAdmin", "currentUser"]),
        authorText() {
            if (this.item.author) {
                const date = Utils.dateToString(this.item.dateCreated);
                const author = this.getUserById(this.item.author);
                if (author) {
                    return `${author.name} created ${date}`;
                }
            }
        },
        editorText() {
            if (this.item.editor) {
                const date = Utils.dateToString(this.item.dateEdited);
                const editor = this.getUserById(this.item.editor);
                if (editor) {
                    return `${editor.name} edited ${date}`;
                }
            }
        },
        getTextWithSelection() {
            if (this.searchText) {
                return this.item.name.replace(
                    new RegExp(this.searchText, "gi"),
                    "<span class='selected'>$&</span>"
                );
            } else {
                return this.item.name;
            }
        },
        codeValue() {
            return this.item.code;
        },
        isAuthor() {
            return this.item.author === this.currentUser.id;
        },
        canEdit() {
            return this.isAdmin || this.isAuthor;
        },
    },
    methods: {
        ...mapActions(useTasksPage, ["setFilter"]),
        editItem() {
            this.$emit("editItem", this.item);
        },
        checkWidthByKey(key) {
            const elem = this.$refs[key];
            if (key === "name") {
                this.tooltipName = elem.scrollHeight > elem.offsetHeight + 1;
            } else {
                this.tooltipCode = elem.scrollWidth > elem.offsetWidth;
            }
        },
        changeConfirm(value) {
            this.isOpenConfirm = !!value;
        },
        deleteItem() {
            Utils.fetchApi.projects.delete({ id: this.item.id }).then(() => {
                this.$emit("getList");
            });
        },
        goToItem() {
            this.setFilter({ project: this.item });
            navigateTo("/tasks/list");
        },
    },
    mounted() {
        this.checkWidthByKey("name");
        this.checkWidthByKey("code");
    },
    watch: {
        eventResize() {
            this.checkWidthByKey("name");
            this.checkWidthByKey("code");
        },
        getNameWithSelection: {
            handler: function () {
                this.checkWidthByKey("name");
            },
            flush: "post",
        },
        codeValue: {
            handler: function () {
                this.checkWidthByKey("code");
            },
            flush: "post",
        },
    },
};
</script>

<style lang="scss" scoped>
.item {
    .item-btn {
        width: 40px;
    }

    .text-grey {
        color: #8e8e8e;
    }

    .sub-info {
        flex-wrap: nowrap;
        gap: 16px;

        & > :nth-child(n) {
            white-space: nowrap;
        }
    }

    :deep(.selected) {
        color: $primary;
    }

    .modal-view {
        padding: 8px;
    }

    .ellipsis-text-lines {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
</style>
