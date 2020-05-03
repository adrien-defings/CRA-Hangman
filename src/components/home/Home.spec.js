import React from 'react'
import { shallow } from 'enzyme'

import Home from './Home'

// WITH JEST + ENZYME
//  it('should trigger its `onClick` on singlePlayer Mode', () => {
//    const onClick = jest.fn()
//    const wrapper = shallow(
//      <Home onClick={onClick} />
//    )

//    wrapper.find('button').at(0).simulate('click')
//    expect(onClick).toHaveBeenCalledWith("singlePlayer")
//  })

import { expect } from 'chai'
import sinon from 'sinon'

// With Chai-Enzyme + sinon
describe('<Home />', () => {
  let onClick
  let wrapper

  // Render the component in the beforeEach
  // => Each test can get a new shallow rendered wrapper
  beforeEach(() => {
    onClick = sinon.spy()
    wrapper = shallow(
      <Home onClick={onClick} />
    )
    expect(wrapper).to.matchSnapshot()
  })

  it('should trigger its `onClick` on singlePlayer Mode', () => {
    wrapper.find('button').at(0).simulate('click')
    expect(onClick).to.have.been.calledWith("singlePlayer")
  })

  it('should trigger its `onClick` on multiplayer Mode', () => {
    wrapper.find('button').at(1).simulate('click')
    expect(onClick).to.have.been.calledWith("multiplayer")
  })
})