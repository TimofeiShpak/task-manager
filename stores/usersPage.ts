import { TYPE_SORT } from "~/helpers/constants";

export const useUsersPage = defineStore('useUsersPage', {
    state: () => ({
        page: 0,
        sort: TYPE_SORT.ASC,
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