import React from 'react'

import { shallow } from 'enzyme'
import { expect } from 'chai'

import HighScoreInput from './HighScoreInput'

describe('<HighScoreInput />', () => {
  let wrapperInput
  const guesses = 10
  const word = "fakeword"

  beforeEach(() => {
    wrapperInput = shallow(
      <HighScoreInput
        guesses={guesses}
        word={word}
        onStored={() => { }}
      />
    )
    expect(wrapperInput).to.matchSnapshot()
  })

  it('should fail if no credentials are provided', () => {
    wrapperInput.setState({ winner: "TESTPLAYER" })
    const fakeEvent = { preventDefault: () => { } }

    wrapperInput.find('.highScoreInput').simulate('submit', fakeEvent)
  })
})