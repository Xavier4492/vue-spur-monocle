import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useMonocle } from '../src/composables/useMonocle'
import { MonocleKey } from '../src/injectionKey'

const Dummy = defineComponent({
  setup() {
    const { init, getBundle, on, off } = useMonocle()
    return () => h('div')
  }
})

describe('useMonocle composable', () => {
  it('throws if no provider', () => {
    expect(() => mount(Dummy)).toThrow(/instance not found/)
  })

  it('works when provided', () => {
    const mockMonocle = { init: vi.fn(), getBundle: vi.fn(), on: vi.fn(), off: vi.fn() }
    const wrapper = mount(Dummy, {
      global: {
        provide: { [MonocleKey as symbol]: mockMonocle }
      }
    })
    // At mount we should have called nothing yet
    expect(mockMonocle.init).not.toHaveBeenCalled()
  })
})