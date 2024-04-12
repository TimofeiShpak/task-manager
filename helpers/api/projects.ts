export default (api: any) => {
    return {
        getProject: (data: any) => {
            return api('/api/projects/getProject', {
                method: 'POST',
                body: data,
            })
        },
        getList: (data: any) => {
            return api('/api/projects/getList', {
                method: 'POST',
                body: data,
            })
        },
        create: (data: any) => {
            return api('/api/projects/create', {
                method: 'POST',
                body: data,
            })
        },
        edit: (data: any) => {
            return api('/api/projects/edit', {
                method: 'POST',
                body: data,
            })
        },
        delete: (data: any) => {
            return api('/api/projects/delete', {
                method: 'POST',
                body: data,
            })
        },
    }
}