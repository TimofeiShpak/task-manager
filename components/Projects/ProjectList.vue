<template>
    <div class="project-list column" v-if="isInited">
        <q-card-section class="row controls q-pa-none" v-if="isSearch">
            <SearchInput :value="searchText" @search="onSearch" />
            <SortButtonAttributte :value="sort" @input="onSort" />
            <q-btn
                color="primary"
                label="Add project"
                @click="toggleEdit(true)"
            />
        </q-card-section>
        <div class="empty-banner column" v-if="isEmpty">
            <div class="q-mb-sm">{{ emptyText }}</div>
            <q-btn
                v-if="!isSearch"
                color="primary"
                label="Add project"
                @click="toggleEdit(true)"
            />
        </div>
        <q-list class="projects-container" v-else>
            <template v-for="item in projects" :key="item.id">
                <ProjectItem
                    :item="item"
                    :searchText="searchText"
                    @getList="getList"
                    @editItem="editItem"
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
        <EditProject
            class="modal-project"
            :isOpen="isOpenEdit"
            :item="editedData"
            @input="toggleEdit"
            @save="onSave"
        />
    </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import type { Sort, Project } from "~/helpers/types"

export default {
    data() {
        return {
            projects: [] as Array<Project>,
            editedData: {} as Project | null,
            limit: 2,
            total: 0,
            isOpenEdit: false,
            isInited: false,
        };
    },
    computed: {
        ...mapState(useProjectsPage, ["page", "sort", "searchText"]),
        isPaging() {
            return this.total > this.limit;
        },
        isEmpty() {
            return !(this.projects && this.projects.length);
        },
        isSearch() {
            return !!(!this.isEmpty || this.searchText);
        },
        emptyText() {
            if (this.isSearch) {
                return "No project matches the search results";
            } else {
                return "No projects have been created";
            }
        },
    },
    methods: {
        ...mapActions(useProjectsPage, ["setPage", "setSort", "setSearchText"]),
        ...mapActions(useStore, ["fetchUserList"]),
        checkPage() {
            const maxPage = Math.ceil(this.total / this.limit);
            const isLastPage = maxPage - this.page < 2;
            if (this.projects.length === 1 && isLastPage) {
                this.setPage(Math.max(this.page - 1, 0));
            }
        },
        getList() {
            this.checkPage();
            const dto = {
                data: {
                    name: this.searchText,
                },
                sort: {
                    type: this.sort.type,
                    attribute: this.sort.attribute.value,
                },
                page: this.page,
                limit: this.limit,
            };

            type dataType = { response: { data: Array<Project>, total: number } }
            return Utils.fetchApi.projects.getList(dto).then((data: dataType) => {
                if (data && data.response) {
                    this.projects = data.response.data || [];
                    this.total = data.response.total;
                    this.getUsersProjects();
                }
            });
        },
        getUsersProjects() {
            const idSet = new Set<string>();
            this.projects.forEach((x) => {
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
        toggleEdit(value: boolean) {
            this.isOpenEdit = value;
            if (!value) {
                this.editedData = null;
            }
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
        editItem(value: Project) {
            this.toggleEdit(true);
            this.editedData = value;
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
.project-list {
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

    .modal-project {
        padding: 0;
    }

    .projects-container {
        max-width: 100%;
        min-width: 1%;
    }
}
</style>
