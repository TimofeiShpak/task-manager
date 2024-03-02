<template>
    <div>
        <q-btn-dropdown
            flat
            label=""
            dropdown-icon="more_vert"
            class="item-btn"
            @click.stop
        >
            <q-list>
                <q-item clickable v-close-popup @click.stop="editItem">
                    <q-item-section>
                        <q-item-label>Edit</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item
                    clickable
                    v-close-popup
                    @click.stop="changeConfirm(true)"
                >
                    <q-item-section>
                        <q-item-label class="danger"> Delete </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-btn-dropdown>
        <Confirm
            class="modal-view"
            :isOpen="isOpenConfirm"
            @input="changeConfirm"
            @confirm="deleteItem"
        >
            <div>
                Are you sure you want to
                <span class="danger">delete</span> task?
            </div>
        </Confirm>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        task: Object,
    },
    data() {
        return {
            isOpenConfirm: false,
        };
    },
    methods: {
        changeConfirm(value) {
            this.isOpenConfirm = !!value;
        },
        deleteItem() {
            Utils.fetchApi.tasks.delete({ id: this.task.id }).then(() => {
                this.$emit("deleteTask");
            });
        },
        editItem() {
            navigateTo(`/tasks/edit/${this.task.id}`);
        },
    },
};
</script>

<style lang="scss" scoped>
.item-btn {
    width: 40px;
}

.modal-view {
    padding: 0;
}
</style>
