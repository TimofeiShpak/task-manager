<template>
    <ModalWrapper
        @cancel="cancel"
        @submit="submit"
        :isOpen="isOpen"
        title="Confirm"
    >
        <q-card-section>
            <template v-if="hasSlot('default')">
                <slot></slot>
            </template>
            <div v-else>{{ text }}</div>
        </q-card-section>
    </ModalWrapper>
</template>
  
<script lang="ts">
export default {
    props: {
        isOpen: Boolean,
        text: String,
        textHTML: String,
    },
    methods: {
        cancel() {
            this.$emit("input", false);
        },
        submit() {
            this.$emit("input", false);
            this.$emit("confirm");
        },
        hasSlot(name) {
            return !!this.$slots[name];
        },
    },
};
</script>
