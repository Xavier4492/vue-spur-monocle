// “Default” export: the Vue plugin factory
import { MonoclePlugin } from './plugin'
export default MonoclePlugin

// Named exports for Composition API, key, and types
export { useMonocle } from './composables/useMonocle'
export { MonocleKey } from './injectionKey'
export type { MonocleOptions, MonocleEvents } from 'spur-monocle-manager'
