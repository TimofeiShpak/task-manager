<template>
    <div class="profile row">
        <div>
            <Avatar :user="user" />
        </div>
        <div class="user-main">
            <div class="row user-info">
                <div class="user-name">{{ user.name }}</div>
                <div>
                    <q-badge
                        transparent
                        align="middle"
                        :color="isActiveColor"
                        class="status"
                    >
                        {{ isActiveLabel }}
                    </q-badge>
                </div>
                <div side class="q-ml-auto" v-if="isCurrent || isAdmin">
                    <div class="text-grey-8 q-gutter-xs">
                        <q-btn-dropdown
                            stretch
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
                                    @click="editProfile"
                                >
                                    <q-item-section>
                                        <q-item-label>Edit</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item
                                    v-if="isCurrent"
                                    clickable
                                    v-close-popup
                                    @click="changeConfirm(true)"
                                >
                                    <q-item-section>
                                        <q-item-label>
                                            Change password
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item
                                    clickable
                                    v-close-popup
                                    @click="seeTasks"
                                >
                                    <q-item-section>
                                        <q-item-label>See tasks</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item
                                    v-if="!isCurrent"
                                    clickable
                                    v-close-popup
                                    @click="deleteProfile"
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
                </div>
            </div>
            <div class="about-me">
                <div class="label">About me:</div>
                <div>
                    {{ user.aboutMe || "" }}
                </div>
            </div>
        </div>
        <Confirm
            :isOpen="isOpenConfirm"
            @input="changeConfirm"
            @confirm="changePassword(true)"
            text="Are you sure you want to change password?"
        />
        <ChangePassword
            :isOpen="isOpenChangePassword"
            @input="changePassword"
        />
    </div>
</template>

<script lang="ts">
import { mapState } from "pinia";

export default {
    props: {
        user: Object,
        isCurrent: Boolean,
    },
    data() {
        return {
            isOpenChangePassword: false,
            isOpenConfirm: false,
        };
    },
    computed: {
        ...mapState(useStore, ["isAdmin"]),
        isActive() {
            return !!this.user.isActive;
        },
        isActiveLabel() {
            return this.isActive ? "Active" : "Blocked";
        },
        isActiveColor() {
            return this.isActive ? "" : "brown-5";
        },
    },
    methods: {
        editProfile() {
            this.$emit("editUser", this.user);
        },
        changeConfirm(value) {
            this.isOpenConfirm = !!value;
        },
        changePassword(value) {
            this.isOpenChangePassword = !!value;
        },
        deleteProfile() {
            Utils.fetchApi.users.delete({ id: this.user.id }).then(() => {
                navigateTo("/users");
            });
        },
        seeTasks() {},
    },
};
</script>

<style lang="scss" scoped>
.profile {
    .avatar {
        width: 300px;
        height: 300px;
        border-radius: 0;
        font-size: 150px;
        line-height: 300px;
    }

    .status {
        width: fit-content;
        margin-top: 10px;
    }

    .user-info {
        flex: 1 1 auto;
        gap: 24px;
    }

    .user-main {
        padding-left: 24px;
        flex: 1 1 auto;
    }

    .user-name {
        font-size: 24px;
        font-weight: bold;
    }
    .about-me {
        margin-top: 24px;
    }

    .label {
        color: #8e8e8e;
    }

    .item-btn {
        width: 40px;
    }
}
</style>
