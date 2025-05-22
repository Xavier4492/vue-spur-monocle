import { inject } from 'vue'
import { MonocleEvents } from 'spur-monocle-manager'
import { MonocleKey } from '../injectionKey'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UseMonocleComposable {
  init: () => Promise<void>
  getAssessment: () => Promise<any>
  on: (event: MonocleEvents, handler: (detail: any) => void) => void
  off: (event: MonocleEvents, handler: (detail: any) => void) => void
}

/**
 * Composable to access the Monocle SDK instance
 * @throws if the instance hasn't been provided
 */
export function useMonocle() {
  const monocle = inject(MonocleKey)
  if (!monocle) {
    throw new Error('[Monocle] instance not found: did you include the boot file?')
  }

  /**
   * Initializes the SDK (injects the script if not already done)
   */
  async function init(): Promise<void> {
    if (!monocle) {
      throw new Error('[Monocle] instance not found: did you include the boot file?')
    }
    await monocle.init()
  }

  /**
   * Retrieves a freshly generated assessment
   */
  async function getAssessment(): Promise<any> {
    if (!monocle) {
      throw new Error('[Monocle] instance not found: did you include the boot file?')
    }
    return monocle.getAssessment()
  }

  /**
   * Registers a listener for Monocle events
   */
  function on(event: MonocleEvents, handler: (detail: any) => void): void {
    if (!monocle) {
      throw new Error('[Monocle] instance not found: did you include the boot file?')
    }
    monocle.on(event, handler)
  }

  /**
   * Removes an existing event listener
   */
  function off(event: MonocleEvents, handler: (detail: any) => void): void {
    if (!monocle) {
      throw new Error('[Monocle] instance not found: did you include the boot file?')
    }
    monocle.off(event, handler)
  }

  return {
    init,
    getAssessment,
    on,
    off,
  }
}
