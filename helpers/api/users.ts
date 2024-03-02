export default (api) => {
    return {
        getUser: (data) => {
            return api('/api/users/getUser', {
                method: 'POST',
                body: data,
            })
        },
        getUserList: (data) => {
            return api('/api/users/getUserList', {
                method: 'POST',
                body: data,
            })
        },
        create: (data) => {
            return api('/api/users/create', {
                method: 'POST',
                body: data,
            })
        },
        edit: (data) => {
            return api('/api/users/edit', {
                method: 'POST',
                body: data,
            })
        },
        delete: (data) => {
            return api('/api/users/delete', {
                method: 'POST',
                body: data,
            })
        },
    }
}