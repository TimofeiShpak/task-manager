import { TYPE_SORT, OPTIONS_SORT } from "~/helpers/constants";
import type { Sort, TaskFilter } from "~/helpers/types"

interface State {
    page: number;
    sort: Sort;
    searchText: string
    filter: TaskFilter
}

export const useTasksPage = defineStore('useTasksPage', {
    state: (): State => ({
        page: 0,
        sort: {
            type: TYPE_SORT.ASC,
            attribute: OPTIONS_SORT[0]
        },
        searchText: "",
        filter: {
            project: null,
            status: null,
        },
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
        setFilter(value: TaskFilter) {
            let key: keyof TaskFilter
            for (key in value) {
                this.filter = {
                    ...this.filter,
                    [key]: value[key]
                }
            }
        },
    }
})