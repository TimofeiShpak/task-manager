<template>
    <q-item clickable @click="goToUser()">
        <q-item-section avatar>
            <Avatar :user="user" />
        </q-item-section>

        <q-item-section>{{ user.name }}</q-item-section>
        <q-item-section side v-if="isCurrent || isAdmin">
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
                            @click.stop="editProfile"
                        >
                            <q-item-section>
                                <q-item-label>Edit</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                            v-if="!isCurrent"
                            clickable
                            v-close-popup
                            @click.stop="deleteProfile"
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
</template>

<script lang="ts">
import { mapState } from "pinia";
import type { PropType } from "vue";
import type { User } from "~/helpers/types";

export default {
    props: {
        user: {
            type: Object as PropType<User>,
            required: true
        },
    },
    computed: {
        ...mapState(useStore, ["currentUser", "isAdmin"]),
        isCurrent() {
            if (this.user && this.currentUser) {
                return this.user.id === this.currentUser.id;
            }
        },
    },
    methods: {
        goToUser() {
            navigateTo(this.getUrl(false));
        },
        editProfile() {
            navigateTo(this.getUrl(true));
        },
        deleteProfile() {
            Utils.fetchApi.users.delete({ id: this.user.id }).then(() => {
                this.$emit("getUsers");
            });
        },
        getUrl(isEdit: boolean) {
            let url = "/user/item/";
            if (isEdit) {
                url += "edit/";
            } else {
                url += "view/";
            }
            url += this.user.id;
            return url;
        },
    },
};
</script>

<style lang="scss" scoped>
.item-btn {
    width: 40px;
}
</style>
