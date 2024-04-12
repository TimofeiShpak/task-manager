export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', {
        mounted(el, binding) {
            el.handler = function (event: Event) {
                if (!(el == event.target || el.contains(event.target))) {
                    binding.value && binding.value()
                }
            };
            document.body.addEventListener('click', el.handler)
        },
        unmounted(el) {
            document.body.removeEventListener('click', el.handler)
        },
    })
})
