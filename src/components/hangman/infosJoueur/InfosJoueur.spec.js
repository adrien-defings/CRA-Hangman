import React from 'react'
import ReactDOM from 'react-dom'

import InfosJoueur from './InfosJoueur'

describe('<InfosJoueur />', () => {

  it('render with non-ended game props', () => {
    render(false, 3)
  })

  it('render with ended game without winner props', () => {
    render(true, 3)
  })

  it('render with ended game with winner props', () => {
    render(true, 2)
  })

  function render(isGameEnded, winner) {
    const div = document.createElement('div')
    ReactDOM.render(
      <InfosJoueur
        isGameEnded={isGameEnded}
        winner={winner}
        color="primary"
        navigationMode="singlePlayer"
        currentPlayer={0}
      />,
      div
    )
  }
})
