<template>
    <ModalWrapper
        @cancel="cancel"
        @submit="submit"
        :isOpen="isOpen"
        :title="title"
    >
        <q-card-section>
            <q-input
                class="q-mb-sm"
                ref="inputCode"
                filled
                v-model="code"
                label="Code *"
                lazy-rules
                autogrow
                :rules="[checkByRulesCode]"
            />
            <q-input
                filled
                v-model="name"
                label="Name *"
                lazy-rules
                autogrow
                :rules="[Utils.checkByRules]"
            />
        </q-card-section>
    </ModalWrapper>
</template>
  
<script lang="ts">
import { mapState } from "pinia";

export default {
    props: {
        isOpen: Boolean,
        item: Object,
    },
    data() {
        return {
            code: null,
            name: null,
            loadedCodes: [],
        };
    },
    computed: {
        ...mapState(useStore, ["currentUser"]),
        isCodeExist() {
            return this.loadedCodes.includes(this.code);
        },
        isEdit() {
            return !!(this.item && this.item.id);
        },
        title() {
            if (this.isEdit) {
                return "Edit project";
            } else {
                return "Create project";
            }
        },
    },
    methods: {
        cancel() {
            this.$emit("input", false);
            this.reset();
        },
        submit() {
            let dto = {
                code: this.code,
                name: this.name,
            };
            let api = Utils.fetchApi.projects.create;
            if (this.isEdit) {
                dto.id = this.item.id;
                dto.editor = this.currentUser.id;
                api = Utils.fetchApi.projects.edit;
            } else {
                dto.author = this.currentUser.id;
            }
            api(dto).then((data) => {
                if (data && data.response) {
                    this.reset();
                    this.$emit("input", false);
                    this.$emit("save");
                } else {
                    this.loadedCodes.push(this.code);
                    this.$refs.inputCode.validate();
                }
            });
        },
        reset() {
            this.code = null;
            this.name = null;
            this.loadedCodes = [];
        },
        checkByRulesCode(val) {
            if (this.isCodeExist) {
                return "Project with given code already exists";
            } else {
                return Utils.checkByRules(val);
            }
        },
    },
    watch: {
        isEdit(val) {
            if (val) {
                this.name = this.item.name;
                this.code = this.item.code;
            } else {
                this.name = null;
                this.code = null;
            }
        },
    },
};
</script>
  
<style lang="scss" scoped>
</style>