export default (api) => {
    return {
        getTask: (data) => {
            return api('/api/tasks/getTask', {
                method: 'POST',
                body: data,
            })
        },
        getList: (data) => {
            return api('/api/tasks/getList', {
                method: 'POST',
                body: data,
            })
        },
        create: (data) => {
            return api('/api/tasks/create', {
                method: 'POST',
                body: data,
            })
        },
        edit: (data) => {
            return api('/api/tasks/edit', {
                method: 'POST',
                body: data,
            })
        },
        delete: (data) => {
            return api('/api/tasks/delete', {
                method: 'POST',
                body: data,
            })
        },
    }
}