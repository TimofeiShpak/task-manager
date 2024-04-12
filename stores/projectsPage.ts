import { TYPE_SORT, OPTIONS_SORT } from "~/helpers/constants";
import type { Sort } from "~/helpers/types"

interface State {
    page: number;
    sort: Sort;
    searchText: string;
}

export const useProjectsPage = defineStore('useProjectsPage', {
    state: (): State => ({
        page: 0,
        sort: {
            type: TYPE_SORT.ASC,
            attribute: OPTIONS_SORT[0]
        },
        searchText: "",
    }),
    actions: {
        setPage(value: number) {
            this.page = value
        },
        setSort(value: Sort) {
            this.sort = value
        },
        setSearchText(value: string) {
            this.searchText = value
        },
    }
})