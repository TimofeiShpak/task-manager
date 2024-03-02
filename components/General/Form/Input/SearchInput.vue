<template>
    <q-input
        outlined
        v-model="getText"
        placeholder="Search"
        ref="input"
        class="search-input"
        dense
        @keydown.enter.prevent="search"
    >
        <template v-slot:append>
            <Icon
                v-if="isClear"
                class="pointer q-ml-sm"
                icon="clear"
                @click="clear"
            />
            <Icon class="pointer q-ml-sm" icon="search" @click="search" />
        </template>
    </q-input>
</template>

<script lang="ts">
export default {
    props: {
        value: String,
    },
    data() {
        return {
            isSearched: false,
            searchText: null,
        };
    },
    computed: {
        isClear() {
            return this.isSearched || this.searchText;
        },
        getText: {
            get() {
                return this.searchText;
            },
            set(value) {
                this.searchText = value;
            },
        },
    },
    methods: {
        search() {
            this.isSearched = true;
            this.$emit("search", this.searchText);
        },
        clear() {
            this.searchText = null;
            this.$refs.input.blur();
            if (this.isSearched) {
                this.isSearched = false;
                this.$emit("search", "");
            }
        },
    },
    mounted() {
        if (this.value) {
            this.searchText = this.value;
            this.isSearched = true;
        }
    },
    watch: {
        value(val) {
            this.searchText = val;
        },
    },
};
</script>

<style lang="scss" scoped>
.search-input {
    flex: 1 1 auto;

    .pointer {
        cursor: pointer;
    }

    :deep(.q-field__control),
    :deep(.q-field__marginal) {
        height: 40px;
    }
}
</style>