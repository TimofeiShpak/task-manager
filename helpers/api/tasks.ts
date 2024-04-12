export default (api: any) => {
    return {
        getTask: (data: any) => {
            return api('/api/tasks/getTask', {
                method: 'POST',
                body: data,
            })
        },
        getList: (data: any) => {
            return api('/api/tasks/getList', {
                method: 'POST',
                body: data,
            })
        },
        create: (data: any) => {
            return api('/api/tasks/create', {
                method: 'POST',
                body: data,
            })
        },
        edit: (data: any) => {
            return api('/api/tasks/edit', {
                method: 'POST',
                body: data,
            })
        },
        delete: (data: any) => {
            return api('/api/tasks/delete', {
                method: 'POST',
                body: data,
            })
        },
    }
}