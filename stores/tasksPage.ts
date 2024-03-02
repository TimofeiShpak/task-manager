import { TYPE_SORT, OPTIONS_SORT } from "~/helpers/constants";

export const useTasksPage = defineStore('useTasksPage', {
    state: () => ({
        page: 0,
        sort: {
            type: TYPE_SORT.ASC,
            attribute: OPTIONS_SORT[0]
        },
        searchText: null,
        filter: {
            project: null,
            status: null,
        },
    }),
    actions: {
        setPage(value) {
            this.page = value
        },
        setSort(value) {
            this.sort = value
        },
        setSearchText(value) {
            this.searchText = value
        },
        setFilter(value) {
            for (let key in value) {
                this.filter[key] = value[key]
            }
        },
    }
})