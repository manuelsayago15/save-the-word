import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'

describe('Login.vue', () => {
  it('Registrarse', () => {
    const wrapper = shallowMount(Login);
    const addButton = wrapper.find('#register')
    addButton.trigger('click')
    expect(wrapper.text()).toMatch(msg)
  })
})
