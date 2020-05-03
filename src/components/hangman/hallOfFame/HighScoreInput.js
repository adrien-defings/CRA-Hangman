import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './hallOfFame.css'

import { saveHOFEntry } from './HallOfFame'

class HighScoreInput extends Component {
  state = { winner : '' }

  // Arrown fn for this binding
  handleWinnerUpdate = (event) => {
    this.setState({
      winner: event.target.value.toUpperCase()
    })
  }

  // Arrown fn for this binding
  persistWinner = (event) => {
    const { guesses, word } = this.props
    event.preventDefault()
    const newEntry = {
      guesses,
      word,
      player : this.state.winner,
    }

    saveHOFEntry(newEntry, this.props.onStored)
  }

  render() {
    return (
      <form className="highScoreInput" onSubmit={this.persistWinner}>
        <div>
            <input
              type="text"
              className="form-control"
              autoComplete="given-name"
              value={this.state.winner}
              onChange={this.handleWinnerUpdate}
              placeholder="Your nickname"
              />
            <button className="btn btn-primary" type="submit">Save my score</button>
        </div>
      </form>
    )
  }
}

HighScoreInput.propTypes = {
  guesses: PropTypes.number.isRequired,
  word: PropTypes.string.isRequired,
  onStored: PropTypes.func.isRequired,
}

export default HighScoreInput