import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useMonocle } from '../src/composables/useMonocle'
import { MonocleKey } from '../src/injectionKey'

/* eslint-disable @typescript-eslint/no-unused-vars */
const Dummy = defineComponent({
  setup() {
    // Destructure the Monocle composable; eslint rule for unused vars is disabled at file scope
    const { init, getAssessment, on, off } = useMonocle()
    return () => h('div')
  },
})

describe('useMonocle composable', () => {
  it('throws if no provider', () => {
    expect(() => mount(Dummy)).toThrow(/instance not found/)
  })

  it('works when provided', () => {
    const mockMonocle = { init: vi.fn(), getAssessment: vi.fn(), on: vi.fn(), off: vi.fn() }
    const wrapper = mount(Dummy, {
      global: {
        provide: { [MonocleKey as symbol]: mockMonocle },
      },
    })

    expect(mockMonocle.init).not.toHaveBeenCalled()
    expect(wrapper.exists()).toBe(true)
  })
})
