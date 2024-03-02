<template>
    <div class="q-pa-md form-wrapper">
        <div class="text-h6 text-center q-mb-md">Authorization</div>
        <q-separator class="q-mb-xl" />
        <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
            ref="myForm"
        >
            <div v-if="isError" class="error">Incorrect email or password</div>
            <q-input
                filled
                v-model="email"
                label="Email *"
                lazy-rules
                :rules="[Utils.checkByRules]"
                :error="isError"
            />

            <PasswordInput v-model="password" :isError="isError" />

            <q-separator class="q-mb-lg" />
            <div class="row justify-end">
                <q-btn
                    label="Registration"
                    color="primary"
                    flat
                    class="q-ml-sm"
                    @click="goToRegistration"
                />
                <q-btn
                    label="Sing in"
                    type="submit"
                    color="primary"
                    class="q-ml-auto"
                />
            </div>
        </q-form>
    </div>
</template>

<script lang="ts">
import { mapActions } from "pinia";

export default {
    data() {
        return {
            email: null,
            password: null,
            isError: false,
        };
    },
    methods: {
        ...mapActions(useStore, ["setCurrentUser"]),
        onSubmit() {
            this.isError = false;
            Utils.fetchApi.users
                .getUser({ email: this.email, password: this.password })
                .then((data) => {
                    if (data && data.response) {
                        this.setCurrentUser(data.response);
                        navigateTo("/");
                    } else {
                        this.isError = true;
                        this.$refs.myForm.value.validate();
                    }
                });
        },
        onReset() {
            this.email = null;
            this.password = null;
        },
        goToRegistration() {
            navigateTo("/registration");
        },
    },
};
</script>

<style lang="scss" scoped>
.form-wrapper {
    max-width: 400px;
    margin: 0 auto;

    .error {
        color: var(--q-negative);
    }
}
</style>