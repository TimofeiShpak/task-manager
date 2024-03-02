<template>
    <div class="select-wrapper" @click="onClick">
        <q-select
            ref="select"
            filled
            v-model="model"
            :options="items"
            :popup-content-class="menuClass"
            :rules="[checkByRules]"
            :label="inputLabel"
            :clearable="clearable"
            @virtual-scroll="onScroll"
        >
            <template v-slot:option="{ opt }">
                <q-item
                    clickable
                    @click="onSelect(opt)"
                    :class="activeClass(opt)"
                >
                    <q-item-section class="option">
                        <template v-if="hasSlot('option')">
                            <slot name="option" :item="opt"></slot>
                        </template>
                        <q-item-label v-else>{{ opt.label }}</q-item-label>
                    </q-item-section>
                </q-item>
            </template>
            <template v-slot:selected-item="{ opt }">
                <div class="selected-item">
                    <template v-if="hasSlot('selected-item')">
                        <slot name="selected-item" :item="opt"></slot>
                    </template>
                    <template v-else>{{ opt.label }}</template>
                </div>
            </template>
        </q-select>
    </div>
</template>

<script lang="ts">
import { TYPE_SORT, ATTRIBUTE_SORT } from "~/helpers/constants";

export default {
    props: {
        value: Object,
        labelKey: {
            type: String,
            default: "name",
        },
        valueKey: {
            type: String,
            default: "id",
        },
        funcApi: Function,
        inputLabel: String,
        menuClass: String,
        defaultItems: Array,
        clearable: Boolean,
        isRules: Boolean,
    },
    data() {
        return {
            items: [],
            total: 0,
            searchText: null,
            page: 0,
            limit: 5,
            isLoading: true,
            isFirstOpened: false,
        };
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("select", value);
            },
        },
    },
    methods: {
        getList() {
            if (!this.funcApi) {
                return Promise.resolve();
            }

            this.isLoading = true;
            const dto = {
                data: {
                    [this.labelKey]: this.searchText,
                },
                sort: {
                    type: TYPE_SORT.ASC,
                    attribute: ATTRIBUTE_SORT.NAME,
                },
                page: this.page,
                limit: this.limit,
            };
            return this.funcApi(dto)
                .then((data) => {
                    if (data && data.response) {
                        this.items = this.items.concat(
                            (data.response.data || []).map((x) => {
                                return {
                                    ...x,
                                    label: x[this.labelKey],
                                    value: x[this.valueKey],
                                };
                            })
                        );
                        this.total = data.response.total;
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        onSelect(value) {
            this.$refs.select.hidePopup();
            this.model = value;
        },
        hasSlot(name) {
            return !!this.$slots[name];
        },
        onScroll(value) {
            let canGetElse =
                !this.isLoading &&
                value.index + 1 === this.items.length &&
                (this.page + 1) * this.limit < this.total;
            if (canGetElse) {
                this.page++;
                this.getList();
            }
        },
        checkByRules(val) {
            if (this.isRules) {
                return !!(val && val[this.valueKey]) || "Please type something";
            }
        },
        activeClass(val) {
            const value = this.value && this.value[this.valueKey];
            if (value === val[this.valueKey]) {
                return "active-option";
            }
        },
        onClick() {
            if (!this.isFirstOpened) {
                this.isFirstOpened = true;
                this.getList().then(() => {
                    this.$refs.select.showPopup();
                });
            }
        },
    },
    mounted() {
        if (this.defaultItems) {
            this.items = this.defaultItems;
        }
    },
};
</script>

<style lang="scss" scoped>
.active-option {
    color: $primary;
}

.option {
    flex-wrap: nowrap;
}

.selected-item {
    overflow: hidden;
}
</style>