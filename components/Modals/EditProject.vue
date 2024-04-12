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
import type { PropType } from "vue"
import type { Project } from "~/helpers/types"

export default {
    props: {
        isOpen: Boolean,
        item: {
            type: Object as PropType<Project> | PropType<null>,
        },
    },
    data() {
        return {
            code: null as string | null,
            name: null as string | null,
            loadedCodes: [] as Array<string>,
        };
    },
    computed: {
        ...mapState(useStore, ["currentUser"]),
        isCodeExist() {
            if (this.code) {
                return this.loadedCodes.includes(this.code);
            } else {
                return false
            }
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
            interface addintionalOptions {
                id?: string;
                editor?: string;
                author?: string;
            }

            let dto = {
                code: this.code,
                name: this.name,
            } as addintionalOptions;

            let api = Utils.fetchApi.projects.create;
            if (this.isEdit) {
                dto.id = this.item?.id;
                dto.editor = this.currentUser.id;
                api = Utils.fetchApi.projects.edit;
            } else {
                dto.author = this.currentUser.id;
            }
            api(dto).then((data: { response: Project }) => {
                if (data && data.response) {
                    this.reset();
                    this.$emit("input", false);
                    this.$emit("save");
                } else {
                    if (this.code) {
                        this.loadedCodes.push(this.code);
                        const inputCode = this.$refs.inputCode as any
                        inputCode.validate();
                    }
                }
            });
        },
        reset() {
            this.code = null;
            this.name = null;
            this.loadedCodes = [];
        },
        checkByRulesCode(val: string | null) {
            if (this.isCodeExist) {
                return "Project with given code already exists";
            } else {
                return Utils.checkByRules(val);
            }
        },
    },
    watch: {
        isEdit(val) {
            if (val && this.item) {
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