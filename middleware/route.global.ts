export default defineNuxtRouteMiddleware((to, from) => {
    const login = useCookie('login');

    if (!login.value) {
        if (to.name !== 'authorization' && to.name !== 'registration') {
            return navigateTo('/authorization');
        }
    } else if (to.name === 'index') {
        return navigateTo('/projects');
    } else if ((to.name === 'authorization' || to.name === 'registration') && login.value) {
        return navigateTo('/projects');
    } else if (to.name === 'index-tasks') {
        return navigateTo('/tasks/list');
    }
})