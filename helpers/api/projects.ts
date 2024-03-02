export default (api) => {
    return {
        getProject: (data) => {
            return api('/api/projects/getProject', {
                method: 'POST',
                body: data,
            })
        },
        getList: (data) => {
            return api('/api/projects/getList', {
                method: 'POST',
                body: data,
            })
        },
        create: (data) => {
            return api('/api/projects/create', {
                method: 'POST',
                body: data,
            })
        },
        edit: (data) => {
            return api('/api/projects/edit', {
                method: 'POST',
                body: data,
            })
        },
        delete: (data) => {
            return api('/api/projects/delete', {
                method: 'POST',
                body: data,
            })
        },
    }
}