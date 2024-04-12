import { TYPE_SORT } from "~/helpers/constants";

interface State {
    page: number;
    sort: string;
    searchText: string;
}

export const useUsersPage = defineStore('useUsersPage', {
    state: (): State => ({
        page: 0,
        sort: TYPE_SORT.ASC,
        searchText: "",
    }),
    actions: {
        setPage(value: number) {
            this.page = value
        },
        setSort(value: string) {
            this.sort = value
        },
        setSearchText(value: string) {
            this.searchText = value
        },
    }
})