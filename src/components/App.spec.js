import React from 'react'

import { shallow } from 'enzyme'
import { expect } from 'chai'

import App from './App'
import Header from './header/Header'

describe('<App />', () => {
  const navigationModes = ["singlePlayer", "multiplayer"]

  // Render the component in the beforeEach
  // => Each test can get a new shallow rendered wrapper
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <App />
    )
    expect(wrapper).to.matchSnapshot()
  })

  // can be usefull to test precisely the default onClick prop
  // it('should Header renders with good onClick and navigationMode props', () => {
  //   expect(wrapper.find(Home).props.onClick).to.equal(setNavigationMode("home"))
  // })

  it('should App contain an Header component', () => {
    expect(wrapper.find(Header)).to.be.present()
  })

  it('should navigationMode state be updated with associated set function', () => {
    const mode = navigationModes[Math.floor(Math.random() * navigationModes.length)]
    wrapper.instance().setNavigationMode(mode)
    expect(wrapper).to.have.state('navigationMode').to.equal(mode)
  })
})
