import { shallowMount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import MyList from '@/views/MyList.vue'
import Navbar from '@/components/Navbar'
import myStore from './mocks/store'
import Vuex from "vuex"
const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store(myStore)


describe('Funcionamiento de aplicacion', () => {

  it('Al presionar boton, se abre modal de Login', () => {
    const wrapper = shallowMount(Login);
    const addButton = wrapper.find('#login')
    addButton.trigger('click')
    expect(wrapper.html()).toContain('<div class="modal-dialog">')
  }),


  it('Login', () => {
    const wrapper = shallowMount(Login, store)
    wrapper.vm.loginProcess = jest.fn()
    wrapper.vm.loginProcess()
    store.dispatch('userLogin', {displayName: 'Paola',email: 'lol@lol.com', password: '123123'})
    wrapper.find('#loginSubmit').trigger('click')
    expect(wrapper.vm.loginProcess.mock.calls.length).toBe(1)
  }),


  it('Eliminar palabra', () => {
    const wrapper = shallowMount(MyList, store)
    // expect(wrapper.html()).toContain('<h1 class="ml-5 text-center">MY LIST</h1>')
    wrapper.vm.deleteWords = jest.fn()
    wrapper.vm.deleteWords()
    store.dispatch('deleteWords')
    wrapper.find('#delete').trigger('click')
    expect(wrapper.vm.deleteWords.mock.calls.length).toBe(1)
  }),

  it('Cerrar sesion', () => {
    const wrapper = shallowMount(Navbar, store)
    wrapper.vm.logout = jest.fn()
    wrapper.vm.logout()
    store.dispatch('logout')
    wrapper.find('#logout').trigger('click')
    expect(wrapper.vm.logout.mock.calls.length).toBe(1)
  })
})
