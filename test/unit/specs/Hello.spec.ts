import Vue from 'vue'

import { expect } from 'chai'

import HelloWorld from 'components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const hello = new HelloWorld()
    const vm = hello.$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
