<template>
    <div v-if="isNew">
        <EditUser @save="onSave" @reset="onReset" />
    </div>
    <div v-else-if="isExistUser">
        <EditUser
            v-if="isEdit"
            :user="userData"
            @save="onSave"
            @reset="onReset"
        />
        <UserView
            v-else
            :isCurrent="isCurrent"
            :user="userData"
            @editUser="onEdit"
        />
    </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";

export default {
    data() {
        return {
            userData: {},
            isNew: false,
            isEdit: false,
            isInited: false,
            id: null,
        };
    },
    computed: {
        ...mapState(useStore, ["currentUser"]),
        isCurrent() {
            return this.id === this.currentUser.id;
        },
        isExistUser() {
            return !!(this.isInited && this.userData && this.userData.id);
        },
    },
    methods: {
        ...mapActions(useStore, ["setCurrentUser", "fetchUser", "setUser"]),
        onSave(value) {
            if (this.isCurrent) {
                this.setCurrentUser(value);
            } else {
                this.setUser(value);
            }
            navigateTo(`/user/item/view/${value.id}`);
        },
        onReset() {
            if (this.isNew) {
                navigateTo("/users");
            } else {
                navigateTo(`/user/item/view/${this.userData.id}`);
            }
        },
        onEdit() {
            navigateTo(`/user/item/edit/${this.userData.id}`);
        },
    },
    mounted() {
        const route = useRoute();
        const options = (route.params && route.params.options) || [];
        const [type, typeView, id] = options;

        if (type === "new") {
            this.isNew = true;
        } else {
            this.fetchUser(id).then((data) => {
                this.userData = data;
            });
        }
        if (typeView === "edit") {
            this.isEdit = true;
        }
        if (id) {
            this.id = id;
        }

        this.isInited = true;
    },
};
</script>
