<template>
    <q-input
        filled
        :type="type"
        :value="value"
        :modelValue="value"
        @input="$emit('input', $event)"
        label="Password *"
        :rules="[Utils.checkByRules]"
        lazy-rules
        :error="isError"
    >
        <template v-slot:append>
            <Icon :icon="iconPasswordBtn" @click="changeTypePassword" />
        </template>
    </q-input>
</template>

<script lang="ts">
export default {
    props: {
        value: String,
        isError: Boolean,
        errorText: String,
    },
    data() {
        return {
            isPassword: true,
        };
    },
    computed: {
        iconPasswordBtn() {
            return this.isPassword ? "eye-close" : "eye-open";
        },
        type() {
            if (this.isPassword) {
                return "password";
            }
        },
    },
    methods: {
        changeTypePassword() {
            this.isPassword = !this.isPassword;
        },
    },
};
</script>
