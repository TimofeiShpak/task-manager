<template>
    <div>
        <q-toolbar class="bg-primary text-white shadow-2">
            <q-space />
            <CustomLink v-for="(link, i) in links" :key="i" :link="link" />
            <q-btn-dropdown stretch flat label="" :class="profileClass">
                <template v-slot:label>
                    <div class="row items-center no-wrap">
                        <Avatar :user="currentUser" />
                    </div>
                </template>
                <q-list>
                    <q-item
                        v-if="!isCurrentProfileActive"
                        clickable
                        v-close-popup
                        @click="goToProfile"
                    >
                        <q-item-section>
                            <q-item-label>Profile</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="logOut">
                        <q-item-section>
                            <q-item-label>Log out</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-btn-dropdown>
        </q-toolbar>
    </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";

export default {
    data() {
        const links = [
            {
                name: "Projects",
                to: "/projects",
            },
            {
                name: "Tasks",
                to: "/tasks/list",
            },
            {
                name: "Users",
                to: "/users",
            },
        ];

        return {
            links,
        };
    },
    computed: {
        ...mapState(useStore, ["currentUser"]),
        route() {
            const route = useRoute();
            return route;
        },
        isCurrentProfileActive() {
            const options =
                (this.route.params && this.route.params.options) || [];
            const id = options[2];
            return id === this.currentUser.id;
        },
        profileClass() {
            if (this.route.name.startsWith("index-user-options")) {
                return "profile-active";
            }
        },
    },
    methods: {
        ...mapActions(useStore, ["resetCurrentUser"]),
        goToProfile() {
            navigateTo(`/user/item/view/${this.currentUser.id}`);
        },
        logOut() {
            this.resetCurrentUser();
            navigateTo("/");
        },
        goTo(to) {
            navigateTo(to);
        },
    },
};
</script>

<style lang="scss" scoped>
.profile-active {
    background: #fff;
    color: #000;

    .avatar {
        background: #000;
        color: #fff;
    }
}
</style>