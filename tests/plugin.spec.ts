import { createApp, inject } from 'vue'
import { mount } from '@vue/test-utils'
import { MonoclePlugin } from '../src/plugin'
import { MonocleKey } from '../src/injectionKey'

describe('MonoclePlugin', () => {
  it('injects $monocle and provides MonocleKey', () => {
    const app = createApp({})
    app.use(MonoclePlugin, { token: 'test-token' })

    // globalProperties
    expect(app.config.globalProperties.$monocle).toBeDefined()

    // Injection
    const wrapper = mount({
      template: '<div />',
      setup() {
        const mono = inject(MonocleKey)
        expect(mono).toBeDefined()
      }
    }, { global: { plugins: [[MonoclePlugin, { token: 'test-token' }]] } })

    expect(wrapper).toBeTruthy()
  })
})