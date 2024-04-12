<template>
    <div class="task-list column" v-if="isInited">
        <q-card-section class="row controls q-pa-none" v-if="isSearch">
            <SearchInput :value="searchText" @search="onSearch" />
            <SortButtonAttributte :value="sort" @input="onSort" />
            <FilterTasks :value="filter" @update="updateFilter" />
            <q-btn color="primary" label="Add task" @click="addItem" />
        </q-card-section>
        <div class="empty-banner column" v-if="isEmpty">
            <div class="q-mb-sm">{{ emptyText }}</div>
            <q-btn
                v-if="!isSearch"
                color="primary"
                label="Add task"
                @click="addItem"
            />
        </div>
        <q-list class="tasks-container" v-else>
            <template v-for="item in tasks" :key="item.id">
                <TaskItem
                    :item="item"
                    :searchText="searchText"
                    @getList="getList"
                />
            </template>
        </q-list>
        <Paging
            v-if="isPaging"
            :page="page"
            :total="total"
            :limit="limit"
            @goToPage="goToPage"
        />
    </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import type { TaskFilter, Sort, Task, Project, Status } from "~/helpers/types"

export default {
    data() {
        return {
            tasks: [] as Task[],
            limit: 2,
            total: 0,
            isInited: false,
        };
    },
    computed: {
        ...mapState(useTasksPage, ["page", "sort", "searchText", "filter"]),
        isPaging() {
            return this.total > this.limit;
        },
        isEmpty() {
            return !(this.tasks && this.tasks.length);
        },
        isSearch() {
            return !!(!this.isEmpty || this.searchText || this.filter.project);
        },
        emptyText() {
            if (this.isSearch) {
                return "No task matches the search results";
            } else {
                return "No tasks have been created";
            }
        },
    },
    methods: {
        ...mapActions(useTasksPage, [
            "setPage",
            "setSort",
            "setSearchText",
            "setFilter",
        ]),
        ...mapActions(useStore, ["fetchUserList"]),
        checkPage() {
            const maxPage = Math.ceil(this.total / this.limit);
            const isLastPage = maxPage - this.page < 2;
            if (this.tasks.length === 1 && isLastPage) {
                this.setPage(Math.max(this.page - 1, 0));
            }
        },
        getValuesFromFilters() {
            const dto = {} as TaskFilter;
            if (this.filter) {
                let key: keyof typeof this.filter
                for (key in this.filter) {
                    const value = this.filter[key] as any
                    if (value) {
                        dto[key] = value && (value.id || value?.value);
                    }
                }
            }
            return dto;
        },
        getList() {
            this.checkPage();
            let dto = {
                data: {
                    ...this.getValuesFromFilters(),
                    name: this.searchText,
                },
                sort: {
                    type: this.sort.type,
                    attribute: this.sort.attribute.value,
                },
                page: this.page,
                limit: this.limit,
            };

            type dataType = { response: { data: Array<Task>, total: number } }
            return Utils.fetchApi.tasks.getList(dto).then((data: dataType) => {
                if (data && data.response) {
                    this.tasks = data.response.data || [];
                    this.total = data.response.total;
                    this.getUsersProjects();
                }
            });
        },
        getUsersProjects() {
            const idSet = new Set<string>();
            this.tasks.forEach((x) => {
                if (x.author && !idSet.has(x.author)) {
                    idSet.add(x.author);
                }
                if (x.editor && !idSet.has(x.editor)) {
                    idSet.add(x.editor);
                }
            });
            const idList = [...idSet];
            if (idList.length) {
                this.fetchUserList(idList);
            }
        },
        onSearch(value: string) {
            this.setSearchText(value);
            this.goToPage(0);
        },
        addItem() {
            navigateTo("/tasks/new");
        },
        onSort(value: Sort) {
            this.setSort(value);
            this.goToPage(0);
        },
        goToPage(value: number) {
            this.setPage(value);
            this.getList();
        },
        onSave() {
            this.getList();
        },
        updateFilter(value: TaskFilter) {
            this.setFilter(Object.assign({}, value));
            this.goToPage(0);
        },
    },
    mounted() {
        this.getList().finally(() => {
            this.isInited = true;
        });
    },
};
</script>

<style lang="scss" scoped>
.task-list {
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

    .tasks-container {
        max-width: 100%;
        min-width: 1%;
    }
}
</style>
