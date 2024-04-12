export const api = (url: string, options: any) => {
    const { $togglePreloader } = useNuxtApp();
    let { isPreloader = true } = options;
    if (isPreloader) {
        $togglePreloader(true)
    }
    return $fetch(url, options)
        .catch(e => { })
        .finally(() => {
            if (isPreloader) {
                $togglePreloader(false)
            }
        })
};

export const dateToString = (date: Date) => {
    let difference = Date.now() - +new Date(date);
    const minutes = difference / 60 / 1000;
    if (minutes < 60) {
        return `${Math.ceil(minutes)} minutes ago`
    } else {
        const hours = minutes / 60;
        if (hours < 60) {
            return `${Math.ceil(hours)} hours ago`
        } else {
            return new Date(date).toLocaleDateString()
        }
    }
}

export const checkByRules = (val: string | null) => {
    return (val && val.length > 0) || "Please type something";
}