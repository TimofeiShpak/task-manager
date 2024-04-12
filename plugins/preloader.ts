export default defineNuxtPlugin({
	async setup(nuxtApp) {
		const isPreloader = ref(true)
		const countPreloader = ref(1)
		const togglePreloader = (value: boolean) => {
			if (value) {
				if (countPreloader.value < 1) {
					isPreloader.value = true;
				}
				countPreloader.value++;
			} else {
				countPreloader.value--;
				if (countPreloader.value < 1) {
					isPreloader.value = false;
				}
			}
		};

		return {
			provide: {
				isPreloader,
				togglePreloader,
			}
		}
	},
	hooks: {
		'app:mounted'() {
			const { $togglePreloader } = useNuxtApp();
			$togglePreloader(false);
		},
	},
})
