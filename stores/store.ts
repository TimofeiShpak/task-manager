import { ROLE_TYPE } from "~/helpers/constants";

interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    aboutMe: string;
    isActive: boolean;
    role: string;
}
interface State {
    currentUser: User;
    userMap: { [key: string]: User | null };
}

const emptyUser = {
    id: '',
    email: '',
    password: '',
    name: '',
    aboutMe: '',
    isActive: false,
    role: ''
}

export const useStore = defineStore('useStore', {
    state: (): State => ({
        currentUser: emptyUser,
        userMap: {},
    }),
    getters: {
        getUserById: (state) => {
            return (id: string) => state.userMap[id] || null
        },
        isAdmin(state) {
            return state.currentUser.role === ROLE_TYPE.ADMIN
        },
    },
    actions: {
        setCurrentUser(user: User, isSetCookie = true) {
            this.currentUser = user;
            this.userMap[user.id] = user;
            if (isSetCookie) {
                const login = useCookie('login', { maxAge: 3600 });
                login.value = user.id || '';
            }
        },
        resetCurrentUser() {
            this.setCurrentUser(emptyUser);
        },
        getCurrentUser() {
            const login = useCookie('login', { maxAge: 3600 });
            if (login.value && !this.currentUser.id) {
                return this.fetchUser(login.value)
                    .then((data: User) => {
                        this.setCurrentUser(data, false)
                    })
            } else {
                return Promise.resolve()
            }
        },
        fetchUser(id: string) {
            let storeData = this.userMap[id];
            if (storeData) {
                return Promise.resolve(storeData);
            } else {
                return Utils.fetchApi.users.getUser({ id })
                    .then((data: { response: User }) => {
                        if (data.response && data.response) {
                            this.userMap[id] = data.response;
                            return data.response;
                        } else {
                            this.userMap[id] = null;
                            return {};
                        }
                    })
            }
        },
        fetchUserList(idList: Array<string>) {
            let unLoadedItems = idList.filter(x => !this.userMap[x])

            if (unLoadedItems.length === 0) {
                let storeData = idList.map(x => this.userMap[x])
                return Promise.resolve(storeData);
            } else {
                return Utils.fetchApi.users.getUserList({ idList: unLoadedItems })
                    .then((data: { response: { data: Array<User> } }) => {
                        if (data.response && data.response.data) {
                            data.response.data.forEach((x: User) => {
                                this.userMap[x.id] = x;
                            })
                            return data.response.data;
                        } else {
                            unLoadedItems.forEach(x => {
                                this.userMap[x] = null;
                            })
                            let storeData = idList.map(x => this.userMap[x])
                            return storeData;
                        }
                    })
            }
        },
        setUser(value: User) {
            if (value) {
                this.userMap[value.id] = value
            }
        },
    }
})