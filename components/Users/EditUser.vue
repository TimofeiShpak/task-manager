<template>
    <div class="q-pa-md form-wrapper">
        <div class="text-h6 q-mb-md">{{ title }}</div>
        <q-separator class="q-mb-xl" />

        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div class="form-main">
                <div>
                    <q-input
                        filled
                        v-model="name"
                        label="Name *"
                        lazy-rules
                        class="q-mb-sm"
                        :rules="[Utils.checkByRules]"
                    />
                    <q-input
                        v-if="!isEdit"
                        filled
                        v-model="email"
                        label="Email *"
                        lazy-rules
                        class="q-mb-sm"
                        :rules="[Utils.checkByRules]"
                    />
                    <PasswordInput v-model="password" v-if="!isEdit" />
                    <q-input
                        type="textarea"
                        filled
                        v-model="aboutMe"
                        label="About Me"
                        class="q-mb-sm"
                    />
                </div>
                <q-separator vertical inset />
                <div class="q-gutter-md small-form" v-if="isAdmin">
                    <q-toggle v-model="isActive" :label="labelIsActive" />
                    <q-separator class="q-mb-md" />

                    <div class="q-gutter-sm column">
                        <q-radio
                            dense
                            v-model="role"
                            :val="ROLE_TYPE.USER"
                            :label="ROLE_TYPE.USER"
                            class="q-mb-md"
                        />
                        <q-radio
                            dense
                            v-model="role"
                            :val="ROLE_TYPE.ADMIN"
                            :label="ROLE_TYPE.ADMIN"
                            class="q-mb-md"
                        />
                    </div>
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
import { ROLE_TYPE } from "~/helpers/constants";
import { mapState } from "pinia";

export default {
    props: {
        user: Object,
    },
    data() {
        return {
            name: null,
            email: null,
            password: null,
            aboutMe: null,
            isActive: true,
            role: ROLE_TYPE.USER,
            ROLE_TYPE,
        };
    },
    computed: {
        ...mapState(useStore, ["isAdmin"]),
        labelIsActive() {
            return this.isActive ? "Active" : "Blocked";
        },
        isEdit() {
            return !!(this.user && this.user.id);
        },
        title() {
            if (this.isEdit) {
                return "Edit user account";
            } else {
                return "Create user account";
            }
        },
    },
    methods: {
        onSubmit() {
            let dto = {
                name: this.name,
                email: this.email,
                aboutMe: this.aboutMe,
                isActive: this.isActive,
                role: this.role,
            };
            let api = Utils.fetchApi.users.edit;
            if (!this.isEdit) {
                dto.password = this.password;
                api = Utils.fetchApi.users.create;
            } else {
                dto.id = (this.user && this.user.id) || null;
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
        goToRegistration() {
            navigateTo("/authorization");
        },
    },
    mounted() {
        if (this.isEdit) {
            this.name = this.user.name || null;
            this.email = this.user.email || null;
            this.aboutMe = this.user.aboutMe || null;
            this.isActive = !!this.user.isActive;
            this.role = this.user.role || ROLE_TYPE.USER;
        }
    },
};
</script>

<style lang="scss" scoped>
.form-main {
    display: flex;
    gap: 24px;

    & > :first-child {
        flex: 1 1 auto;
    }

    .small-form {
        width: 200px;
        min-width: 200px;
    }
}
</style>