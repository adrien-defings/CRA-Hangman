import React from 'react'

import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Hangman from './Hangman'
import Letters from './letters/Letters'
import { ALPHABET } from '../utils.js'

describe('<Hangman />', () => {

  let wrapper
  const navigationModes = ["singlePlayer", "multiplayer"]
  let navigationMode = navigationModes[0]

  // Render the component in the beforeEach
  // => Each test can get a new shallow rendered wrapper
  beforeEach(() => {

    // setup a DOM element as a render target
    const container = document.createElement("div")
    container.setAttribute("id", "hangmanTestContainer")
    document.body.appendChild(container)

    // create the canvas dom element
    document.querySelector("#hangmanTestContainer").innerHTML = `
      <canvas id="canvas">
        Sorry, this browser does not support &ltcanvas&gt.
        {console.log("Hm, something wents wrong on &ltcanvas&gt build in hangman.spec.js.")}
      </canvas>
    `

    navigationMode = navigationModes[Math.floor(Math.random() * navigationModes.length)]
    wrapper = shallow( <Hangman navigationMode={navigationMode} />)
  })

  it('should match with prev snapshot', () => {
    let wrapperSnapshot = shallow( <Hangman navigationMode="multiplayer" />)
    wrapperSnapshot.setState({ hiddenWord: ["T","E","S","T"] })
    expect(wrapperSnapshot).to.matchSnapshot()
  })

  // Checking the initial state values
  it('should initialize the hiddenWord state to a string', () => {
    expect(typeof expect(wrapper).to.have.state('hiddenWord')).to.be.a('string')
  })

  it('should initialize the usableLetters state to an array of Alphabet chars', () => {
    expect(wrapper).to.have.state('usableLetters').to.deep.equal(ALPHABET)
  })

  it('should initialize the currentPlayer state to 0', () => {
    expect(wrapper).to.have.state('currentPlayer').to.equal(0)
  })

  it('should initialize the movesCount state to [0, 0]', () => {
    expect(wrapper).to.have.state('movesCount').to.deep.equal([0, 0])
  })

  it('should initialize the hallOfFame state to null', () => {
    expect(wrapper).to.have.state('hallOfFame').to.equal(null)
  })

  // on letter click
  it('should trigger its `onClick` on letter Button', () => {
    const onClick = sinon.spy()
    const wrapper = shallow(
      <Letters usableLetters={ALPHABET} color="primary" onClick={onClick} />
    )
    const letterBtn = wrapper.find('.letter.btn').at(0)

    // expect(letterBtn).to.be.truthy
    letterBtn.simulate("click")
    expect(onClick).to.have.been.calledWith("A")
  })

  // onLetterClick state updating tests
  it('should update the state usableLetters to the correct value', () => {
    const char = ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
    ALPHABET.splice(ALPHABET.indexOf(char), 1)
    wrapper.instance().onLetterClick(char)
    expect(wrapper).to.have.state('usableLetters').to.deep.equal(ALPHABET)
  })

  it('should update the state movesCount to the correct value', () => {
    const char = ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
    // ALPHABET.splice(ALPHABET.indexOf(char), 1)
    wrapper.instance().onLetterClick(char)
    expect(wrapper).to.have.state('movesCount').to.deep.equal([1, 0])
  })

  it('should the state currentPlayer didn\'t change in singlePlayer Mode', () => {
    if (navigationMode == "singlePlayer") {
      const char = ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
      // ALPHABET.splice(ALPHABET.indexOf(char), 1)
      wrapper.instance().onLetterClick(char)
      expect(wrapper).to.have.state('currentPlayer').to.deep.equal(0)
    }
  })

})
