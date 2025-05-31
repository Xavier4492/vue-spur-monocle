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
export const MonoclePlugin: Plugin = {
  install(app: App, options: MonocleOptions) {
    const isSSR = typeof window === 'undefined'
    let monocleInstance: Monocle | null

    if (isSSR) {
      // For SSR, we provide a no-op instance
      // This allows the app to compile and run without errors in SSR environments
      monocleInstance = {
        init: async () => {
          /* no-op */
        },
        getAssessment: async () => {
          throw new Error('Monocle not available in SSR')
        },
        on: () => {
          /* no-op */
        },
        off: () => {
          /* no-op */
        },
      } as any as Monocle
      app.config.globalProperties.$monocle = monocleInstance
      app.provide(MonocleKey, monocleInstance)
      return
    }

    if ((app.config.globalProperties as any).$monocle) {
      console.warn('[MonoclePlugin] already installed on this app instance.')
      return
    }

    const monocle = new Monocle(options)
    app.config.globalProperties.$monocle = monocle
    app.provide(MonocleKey, monocle)
  },
}
