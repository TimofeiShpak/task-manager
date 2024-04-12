<template>
    <div class="q-pa-md form-wrapper">
        <div class="text-h6 text-center q-mb-md">Registration</div>
        <q-separator class="q-mb-xl" />
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
                filled
                v-model="name"
                label="Name *"
                lazy-rules
                :rules="[Utils.checkByRules]"
            />
            <q-input
                ref="emailInput"
                filled
                v-model="email"
                label="Email *"
                hint="It used for authorization"
                lazy-rules
                :rules="[checkByRulesEmail]"
            />

            <PasswordInput v-model="password" />

            <q-separator class="q-mb-lg" />
            <div class="row">
                <q-btn
                    label="Reset"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                />
                <q-btn
                    label="Sign up"
                    type="submit"
                    color="primary"
                    class="q-ml-auto"
                />
            </div>
            <q-btn
                label="Authorization"
                color="primary"
                class="q-ml-auto block"
                @click="goToAuthorization"
            />
        </q-form>
    </div>
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { ROLE_TYPE } from "~/helpers/constants";
import type { User } from "~/helpers/types";

export default {
    data() {
        return {
            name: null,
            email: null,
            password: null,
            loadedEmails: [],
        };
    },
    computed: {
        isEmailExist() {
            if (this.email) {
                return this.loadedEmails.includes(this.email);
            } else {
                return false
            }
        },
    },
    methods: {
        ...mapActions(useStore, ["setCurrentUser"]),
        onSubmit() {
            const dto = {
                name: this.name,
                email: this.email,
                password: this.password,
                aboutMe: null,
                isActive: true,
                role: ROLE_TYPE.ADMIN,
            };
            Utils.fetchApi.users.create(dto).then((data: { response: User }) => {
                if (data && data.response) {
                    this.setCurrentUser(data.response);
                    navigateTo("/");
                } else {
                    if (this.email) {
                        this.loadedEmails.push(this.email);
                        const emailInput = this.$refs.emailInput as any
                        emailInput.validate();
                    }
                }
            });
        },
        onReset() {
            this.name = null;
            this.email = null;
            this.password = null;
        },
        goToAuthorization() {
            navigateTo("/authorization");
        },
        checkByRulesEmail(val: string | null) {
            if (this.isEmailExist) {
                return "User with given email already exists";
            } else {
                return Utils.checkByRules(val);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.form-wrapper {
    max-width: 400px;
    margin: 0 auto;
}
</style>