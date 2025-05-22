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
    if (typeof window === 'undefined') return

    if ((app.config.globalProperties as any).$monocle) {
      console.warn('[MonoclePlugin] already installed on this app instance.')
      return
    }

    const monocle = new Monocle(options)
    app.config.globalProperties.$monocle = monocle
    app.provide(MonocleKey, monocle)
  },
}
