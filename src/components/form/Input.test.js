import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input.vue', () => {
  it('renders input element', () => {
    const wrapper = mount(Input)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('updates v-model value when input value changes', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    await input.setValue('test value')
    expect(wrapper.vm.model).toBe('test value')
  })
})