<template>
    <div class="user-list column">
        <q-card-section class="row controls q-pa-none">
            <SearchInput :value="searchText" @search="onSearch" />
            <SortButton :value="sort" @input="onSort" />
            <q-btn
                v-if="isAdmin"
                color="primary"
                label="Add user"
                @click="addUser"
            />
        </q-card-section>
        <template v-if="isInited">
            <div class="empty-banner" v-if="isEmpty">
                No user matches the search results
            </div>
            <q-list>
                <template v-for="user in users" :key="user.id">
                    <UserItem :user="user" @getUsers="getUsers" />
                    <q-separator spaced inset />
                </template>
            </q-list>
            <Paging
                v-if="isPaging"
                :page="page"
                :total="total"
                :limit="limit"
                @goToPage="goToPage"
            />
        </template>
    </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";

export default {
    data() {
        return {
            users: [],
            limit: 2,
            total: 0,
            isInited: false,
        };
    },
    computed: {
        ...mapState(useUsersPage, ["page", "sort", "searchText"]),
        ...mapState(useStore, ["isAdmin"]),
        isPaging() {
            return this.total > this.limit;
        },
        isEmpty() {
            return !(this.users && this.users.length);
        },
    },
    methods: {
        ...mapActions(useUsersPage, ["setPage", "setSort", "setSearchText"]),
        checkPage() {
            const maxPage = Math.ceil(this.total / this.limit);
            const isLastPage = maxPage - this.page < 2;
            if (this.users.length === 1 && isLastPage) {
                this.setPage(Math.max(this.page - 1, 0));
            }
        },
        getUsers() {
            this.checkPage();
            const dto = {
                data: {
                    name: this.searchText,
                },
                sort: this.sort,
                page: this.page,
                limit: this.limit,
            };
            return Utils.fetchApi.users.getUserList(dto).then((data) => {
                if (data && data.response) {
                    this.users = data.response.data || [];
                    this.total = data.response.total;
                }
            });
        },
        onSearch(value) {
            this.setSearchText(value);
            this.setPage(0);
        },
        addUser() {
            navigateTo("/user/new");
        },
        onSort(value) {
            this.setSort(value);
            this.setPage(0);
        },
        goToPage(value) {
            this.setPage(value);
            this.getUsers();
        },
    },
    mounted() {
        this.getUsers().finally(() => {
            this.isInited = true;
        });
    },
};
</script>

<style lang="scss" scoped>
.user-list {
    flex: 1 1 auto;
    max-width: 100%;
    min-width: 1%;

    .controls {
        gap: 24px;
        margin-bottom: 24px;
    }

    .empty-banner {
        border: 1px solid $grey;
        border-radius: 4px;
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
    }
}
</style>
