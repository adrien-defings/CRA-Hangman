
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import randomWords from 'random-words'
import clonedeep from 'lodash.clonedeep'

// eslint-disable-next-line
import { ALPHABET, WORDS } from '../utils.js'
import './hangman.css'
import InfosJoueur from './infosJoueur/InfosJoueur.js'
import HighScoreInput from './hallOfFame/HighScoreInput'
import HallOfFame from './hallOfFame/HallOfFame'
import Letters from './letters/Letters.js'

export default class Hangman extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hiddenWord: this.getHiddenWord(),
      usableLetters: clonedeep(ALPHABET),
      currentPlayer: 0,
      movesCount: [0, 0],
      hallOfFame: null,
    }
    this.INITIAL_STATE = clonedeep(this.state)
  }

  getHiddenWord() {
    // return ["T","E","S","T"]

    // return english word
    return randomWords().toUpperCase().split('')

    // return french word
    // return WORDS[Math.floor(Math.random() * WORDS.length)].split('')
  }

  getHangmanStep(usableLetters, usedLetters) {
    let { hiddenWord } = this.state
    // Getting found hidden word letters
    let foundLetters = this.getWord(usedLetters, hiddenWord)
    foundLetters = foundLetters.filter((letter, index) => {
      return foundLetters.indexOf(letter) === index && letter !== "_"
    })

    // ALPHABET letters number - USABLE letters number ( = USED letters ) - FOUND letters = FAILED moves
    // = canvas/hangman displaying step
    return (ALPHABET.length - usableLetters.length) - foundLetters.length
  }

  isGameEnded(usableLetters) {
    let { hiddenWord } = this.state
    let usedLetters = this.getUsedLetters(usableLetters)
    return !this.getWord(usedLetters, hiddenWord).includes("_") || this.getHangmanStep(usableLetters, usedLetters) > 9
  }

  getWinner(hiddenWord, currentPlayer, usedLetters) {
    return !this.getWord(usedLetters, hiddenWord).includes("_") ? currentPlayer : 3
  }

  // Give a textual representaion of game state
  // Each hidden letters are represented by _underscore_
  getWord(usedLetters, hiddenWord) {
    return hiddenWord.map((letter) => (usedLetters.includes(letter) ? letter : '_'))
  }

  getUsedLetters(usableLetters) {
    return ALPHABET.filter((letter) => { return usableLetters.indexOf(letter) === -1 })
  }

  displayHallOfFame = (hallOfFame) => {
    this.setState({ hallOfFame })
  }

  drawCanvas(usableLetters, givenStep = null, canvasColor = null) {
    let usedLetters = this.getUsedLetters(usableLetters)
    let step = givenStep != null ? givenStep : this.getHangmanStep(usableLetters, usedLetters) - 1
    const canvas = document.getElementById('canvas')

    let ctx = canvas.getContext('2d')
    ctx.strokeStyle = canvasColor != null ? canvasColor : "#333"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    const steps = [
      function step1() {
        ctx.strokeRect(30, 80, 40, 10)
      },

      function step2() {
        ctx.beginPath()
        ctx.moveTo(25, 90)
        ctx.lineTo(0, 90)
        ctx.stroke()
      },

      function step3() {
        ctx.beginPath()
        ctx.moveTo(10, 89)
        ctx.lineTo(10, 0)
        ctx.stroke()
      },

      function step4() {
        ctx.beginPath()
        ctx.moveTo(10, 1)
        ctx.lineTo(50, 1)
        ctx.stroke()
      },

      function step5() {
        ctx.beginPath()
        ctx.moveTo(50, 1)
        ctx.lineTo(50, 20)
        ctx.stroke()
      },

      function step6() {
        ctx.beginPath()
        ctx.arc(50, 30, 10, 0, Math.PI * 2, true)  // Cercle extérieur
        ctx.stroke()
      },

      function step7() {
        ctx.beginPath()
        ctx.moveTo(50, 40)
        ctx.lineTo(50, 60)
        ctx.stroke()
      },

      function step8() {
        ctx.beginPath()
        ctx.moveTo(40, 50)
        ctx.lineTo(60, 50)
        ctx.stroke()
      },

      function step9() {
        ctx.beginPath()
        ctx.moveTo(50, 60)
        ctx.lineTo(40, 79)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(50, 60)
        ctx.lineTo(60, 79)
        ctx.stroke()
      },

      function step10() {
        ctx.clearRect(29, 79, 42, 12)
      },

    ]

    if (0 <= step && step < 10) steps[step]()

  }

  drawOpaqueHangman(usableLetters) {
    for (let i = 0; i < 9; i++) {
      this.drawCanvas(usableLetters, i, "#CCC")
    }
  }

  // fn arrow for binding
  reboot = () => {
    let state = clonedeep(this.INITIAL_STATE)
    state.hiddenWord = this.getHiddenWord()
    this.setState(state)

    // Canvas ( = hangman display ) cleaning
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, 95, 95)

    this.drawOpaqueHangman(ALPHABET)
  }

  // fn arrow for binding
  onLetterClick = letter => {
    let { hiddenWord, usableLetters, movesCount, currentPlayer } = this.state
    let navigationMode = this.props.navigationMode

    // usable letters and current player moves count update
    usableLetters.splice(usableLetters.indexOf(letter), 1)
    movesCount[currentPlayer] += 1

    // if failed move
    if (!hiddenWord.includes(letter)) {
      // Canvas ( = hangman display ) update
      this.drawCanvas(usableLetters)

      if (navigationMode === "multiplayer" && !this.isGameEnded(usableLetters)) {
        currentPlayer = currentPlayer === 0 ? 1 : 0
      }
    }

    this.setState({
      usableLetters,
      movesCount,
      currentPlayer,
    })
  }

  componentDidMount() {
    let { usableLetters } = this.state
    this.drawOpaqueHangman(usableLetters)

    document.addEventListener('keydown', (event) => {
      let { usableLetters } = this.state
      let key = event.key.toUpperCase()
      if (usableLetters.includes(key) && !this.isGameEnded(usableLetters)) this.onLetterClick(key)
    })

  }

  componentWillUnmount(){
    document.removeEventListener("keydown", {});
  }

  render() {
    let { hiddenWord, usableLetters, currentPlayer, movesCount, hallOfFame } = this.state
    let isGameEnded = this.isGameEnded(usableLetters)
    let usedLetters = this.getUsedLetters(usableLetters)
    let winner = this.getWinner(hiddenWord, currentPlayer, usedLetters)
    const colors = ["primary", "danger"]
    let navigationMode = this.props.navigationMode
    let word = isGameEnded ? hiddenWord : this.getWord(usedLetters, hiddenWord)

    return (
      <div id="gameContainer">

        <canvas height={95} width={95} id="canvas">
          Sorry, this browser does not support &ltcanvas&gt.
        </canvas>

        <InfosJoueur
          isGameEnded={isGameEnded}
          winner={winner}
          color={colors[currentPlayer]}
          navigationMode={navigationMode}
          currentPlayer={currentPlayer}
        />
        <span>{movesCount[currentPlayer]} moves</span>

        <div id="word">
          {
            word.map((letter, index) => {
              return (
                <span key={index} letter={letter} className="letter badge badge-light">
                  {letter}
                </span>
              )
            })
          }
        </div>

        {!isGameEnded ?
          <Letters
            usableLetters={usableLetters}
            color={colors[currentPlayer]}
            onClick={this.onLetterClick}
          />
          :
          <div id="successActions">
            <button onClick={this.reboot} className="btn btn-success">Play Again !</button>
            {
              winner !== 3 &&
              <div id="hallOfFame">
                <hr />
                {hallOfFame ?
                  <HallOfFame entries={hallOfFame} />
                  :
                  <HighScoreInput guesses={movesCount[currentPlayer]} word={word.toString().replace(/,/g, "")} onStored={this.displayHallOfFame} />
                }
              </div>
            }
          </div>
        }
      </div>
    )

  }
}

Hangman.defaultProps = {
  navigationMode: 'singlePlayer'
}

Hangman.propTypes = {
  navigationMode: PropTypes.string.isRequired,
}