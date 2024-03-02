import { TYPE_SORT, OPTIONS_SORT } from "~/helpers/constants";

export const useProjectsPage = defineStore('useProjectsPage', {
    state: () => ({
        page: 0,
        sort: {
            type: TYPE_SORT.ASC,
            attribute: OPTIONS_SORT[0]
        },
        searchText: null,
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
    }
})