<template>
    <div class="q-pa-lg flex flex-center pagination">
        <q-pagination
            v-model="modelPage"
            :max="max"
            :max-pages="maxVisiblePage"
            boundary-numbers
            direction-links
            outline
        />
        <q-input
            ref="inputPage"
            outlined
            class="input-page"
            v-model="modelWritePage"
            type="number"
            min="1"
            :max="max"
            @keydown.enter.prevent="onEnter"
            mask="maskInput"
        >
            <template v-slot:before>
                <div class="label-input">Go to the page</div>
            </template>
        </q-input>
        <div class="q-ml-auto text-page">
            {{ textPage }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        page: Number,
        total: Number,
        limit: Number,
        maxVisiblePage: {
            type: Number,
            default: 5,
        },
    },
    data() {
        return {
            writePage: null,
        };
    },
    computed: {
        max() {
            return Math.ceil(this.total / this.limit);
        },
        modelPage: {
            get() {
                return this.page + 1;
            },
            set(value) {
                this.$emit("goToPage", value - 1);
            },
        },
        modelWritePage: {
            get() {
                return this.writePage;
            },
            set(value) {
                if (+value > this.max) {
                    this.writePage = this.max;
                } else if (Number.isInteger(parseInt(value)) && +value < 1) {
                    this.writePage = 1;
                } else {
                    this.writePage = value;
                }
            },
        },
        textPage() {
            const maxOnCurrentPage = Math.min(
                (this.page + 1) * this.limit,
                this.total
            );
            return `${this.page * this.limit + 1}-${maxOnCurrentPage} of ${
                this.total
            }`;
        },
    },
    methods: {
        onEnter() {
            if (this.modelWritePage) {
                if (this.modelWritePage != this.modelPage) {
                    this.modelPage = this.modelWritePage;
                }
                this.modelWritePage = null;
                this.$refs.inputPage.blur();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.pagination {
    :deep(.q-btn) {
        width: 40px;
        height: 40px;
        margin-right: 8px;
    }

    :deep(.input-page) {
        width: 180px;
        margin-left: 24px;

        .label-input {
            font-size: 14px;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input[type="number"] {
            -moz-appearance: textfield;
        }

        .q-field__control,
        .q-field__marginal {
            height: 40px;
        }
    }

    .text-page {
        color: rgba(0, 0, 0, 0.54);
    }
}
</style>
