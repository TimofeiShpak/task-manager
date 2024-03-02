<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="isOpenModel">
            <q-card :style="styles">
                <q-card-section>
                    <div class="text-h6">{{ title }}</div>
                </q-card-section>
                <q-separator />
                <q-form @submit="submit" @reset="cancel">
                    <slot />
                    <q-separator />
                    <q-card-section class="row">
                        <q-btn
                            :label="cancelTextBtn"
                            type="reset"
                            color="primary"
                            flat
                            class="q-ml-sm"
                        />
                        <q-btn
                            :label="submitTextBtn"
                            type="submit"
                            color="primary"
                            class="q-ml-auto"
                        />
                    </q-card-section>
                </q-form>
            </q-card>
        </q-dialog>
    </div>
</template>
  
<script lang="ts">
export default {
    props: {
        isOpen: Boolean,
        title: String,
        width: {
            type: Number,
            default: 500,
        },
        cancelTextBtn: {
            type: String,
            default: "Cancel",
        },
        submitTextBtn: {
            type: String,
            default: "Submit",
        },
    },
    computed: {
        isOpenModel: {
            get() {
                return this.isOpen;
            },
            set(value) {
                this.$emit("input", value);
            },
        },
        styles() {
            return {
                width: this.width + "px",
            };
        },
    },
    methods: {
        cancel() {
            this.$emit("cancel");
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>
  