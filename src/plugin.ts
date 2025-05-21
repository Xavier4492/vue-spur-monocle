import { App, Plugin } from 'vue'
import Monocle, { MonocleOptions } from 'spur-monocle-manager'
import { MonocleKey } from './injectionKey'

/**
 * Vue plugin for Monocle.
 * @param options – Monocle SDK configuration options (must contain `token`)
 * @example
 * ```ts
 * import { MonoclePlugin } from 'vue-monocle'
 *
 * app.use(MonoclePlugin, {token})
 * app.mount('#app')
 * ```
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const MonoclePlugin: Plugin = {
  install(app: App, options: MonocleOptions) {
    // 1️⃣ Ne rien faire en SSR
    if (typeof window === 'undefined') return

    // 2️⃣ Éviter un second use() sur la même app
    if ((app.config.globalProperties as any).$monocle) {
      console.warn('[MonoclePlugin] déjà installé sur cette instance d’app.')
      return
    }

    // 3️⃣ Instancier et injecter
    const monocle = new Monocle(options)
    app.config.globalProperties.$monocle = monocle
    app.provide(MonocleKey, monocle)
  },
}
