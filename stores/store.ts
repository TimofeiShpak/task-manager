import { ROLE_TYPE } from "~/helpers/constants";

export const useStore = defineStore('useStore', {
    state: () => ({
        currentUser: {},
        userMap: {},
    }),
    getters: {
        getUserById: (state) => {
            return (id) => state.userMap[id] || {}
        },
        isAdmin(state) {
            return state.currentUser.role === ROLE_TYPE.ADMIN
        },
    },
    actions: {
        setCurrentUser(user, isSetCookie = true) {
            this.currentUser = user;
            this.userMap[user.id] = user;
            if (isSetCookie) {
                const login = useCookie('login', { maxAge: 3600 });
                login.value = user.id || '';
            }
        },
        resetCurrentUser() {
            this.setCurrentUser({});
        },
        getCurrentUser() {
            const login = useCookie('login', { maxAge: 3600 });
            if (login.value && !this.currentUser.id) {
                return this.fetchUser(login.value)
                    .then((data) => {
                        this.setCurrentUser(data, false)
                    })
            } else {
                return Promise.resolve()
            }
        },
        fetchUser(id) {
            let storeData = this.userMap[id];
            if (storeData) {
                return Promise.resolve(storeData);
            } else {
                return Utils.fetchApi.users.getUser({ id })
                    .then((data) => {
                        if (data.response && data.response) {
                            this.userMap[id] = data.response;
                            return data.response;
                        } else {
                            this.userMap[id] = {};
                            return {};
                        }
                    })
            }
        },
        fetchUserList(idList) {
            let unLoadedItems = idList.filter(x => !this.userMap[x])

            if (unLoadedItems.length === 0) {
                let storeData = idList.map(x => this.userMap[x])
                return Promise.resolve(storeData);
            } else {
                return Utils.fetchApi.users.getUserList({ idList: unLoadedItems })
                    .then((data) => {
                        if (data.response && data.response.data) {
                            data.response.data.forEach(x => {
                                this.userMap[x.id] = x;
                            })
                            return data.response.data;
                        } else {
                            unLoadedItems.forEach(x => {
                                this.userMap[x] = {};
                            })
                            let storeData = idList.map(x => this.userMap[x])
                            return storeData;
                        }
                    })
            }
        },
        setUser(value) {
            if (value) {
                this.userMap[value.id] = value
            }
        },
    }
})