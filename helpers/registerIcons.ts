const iconsContext = import.meta.glob('~/assets/icons/*.svg')
Object.values(iconsContext).forEach(x => x && x())
