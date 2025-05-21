declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

import { ComponentCustomProperties } from 'vue'
import Monocle from 'spur-monocle-manager'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $monocle: Monocle
  }
}
