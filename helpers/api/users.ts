export default (api: any) => {
    return {
        getUser: (data: any) => {
            return api('/api/users/getUser', {
                method: 'POST',
                body: data,
            })
        },
        getUserList: (data: any) => {
            return api('/api/users/getUserList', {
                method: 'POST',
                body: data,
            })
        },
        create: (data: any) => {
            return api('/api/users/create', {
                method: 'POST',
                body: data,
            })
        },
        edit: (data: any) => {
            return api('/api/users/edit', {
                method: 'POST',
                body: data,
            })
        },
        delete: (data: any) => {
            return api('/api/users/delete', {
                method: 'POST',
                body: data,
            })
        },
    }
}