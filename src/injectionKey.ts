import type { InjectionKey } from 'vue'
import type Monocle from 'spur-monocle-manager'

export const MonocleKey: InjectionKey<Monocle> = Symbol('monocle')
