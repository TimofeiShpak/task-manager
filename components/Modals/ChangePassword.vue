<template>
    <ModalWrapper
        @cancel="cancel"
        @submit="submit"
        :isOpen="isOpen"
        title="Change password"
    >
        <q-card-section>
            <div v-if="isError" class="error q-mb-sm">
                Passwords don't match
            </div>
            <PasswordInput
                v-model="password"
                :isError="isError"
                class="q-mb-sm"
            />
            <PasswordInput v-model="passwordRepeat" :isError="isError" />
        </q-card-section>
    </ModalWrapper>
</template>
  
<script lang="ts">
import { mapState } from "pinia";

export default {
    props: {
        isOpen: Boolean,
    },
    data() {
        return {
            password: null,
            passwordRepeat: null,
            isValidated: false,
        };
    },
    computed: {
        ...mapState(useStore, ["currentUser"]),
        curentUserId() {
            return this.currentUser && this.currentUser.id;
        },
        isError() {
            return this.isValidated && this.password != this.passwordRepeat;
        },
    },
    methods: {
        cancel() {
            this.$emit("input", false);
            this.reset();
        },
        submit() {
            this.isValidated = true;
            if (!this.isError) {
                Utils.fetchApi.users
                    .edit({ id: this.curentUserId, password: this.password })
                    .then(() => {
                        this.reset();
                        this.$emit("input", false);
                    });
            }
        },
        reset() {
            this.password = null;
            this.passwordRepeat = null;
            this.isValidated = false;
        },
    },
};
</script>
  
<style lang="scss" scoped>
.error {
    color: var(--q-negative);
}
</style>