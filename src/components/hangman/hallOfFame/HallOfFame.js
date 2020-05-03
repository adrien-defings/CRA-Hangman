import PropTypes from 'prop-types'
import React from 'react'

import './hallOfFame.css'

const HallOfFame = ({ entries }) => (
  <div className="hofContainer">
    <h5>Hall Of Fame </h5>
    <table className="hallOfFame table">
      <thead className="">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Word</th>
          {/* <th scope="col">Date</th> */}
          <th scope="col">Moves</th>
          <th scope="col">Player</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(({id, guesses, word, player }, index) => (
          <tr key={id}>
            <td className="index">{index + 1}</td>
            <td className="word">{word}</td>
            <td className="guesses">{guesses}</td>
            <td className="player">{player}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

HallOfFame.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      guesses: PropTypes.number.isRequired,
      word: PropTypes.string.isRequired,
      player: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default HallOfFame

// == Internal helpers ==============================================

export const FAKE_HOF = [
  { guesses: 18, word: 'test', player: 'Jane',  date: '10/10/2017', id: 3, },
  { guesses: 23, word: 'test', player: 'Kevin',  date: '11/10/2017', id: 2, },
  { guesses: 31, word: 'test', player: 'Louisa',  date: '06/10/2017', id: 1, },
  { guesses: 48, word: 'test', player: 'Marc',  date: '14/10/2017', id: 0, },
]

const HOF_KEY = '::Memory::HallofFame'

export function saveHOFEntry(entry, onStored) {
  entry.date = new Date().toLocaleDateString()
  entry.id = Date.now()

  const entries = JSON.parse(localStorage.getItem(HOF_KEY) || '[]')
  const insertionPoint = entries.findIndex(
    ({ guesses }) => guesses >= entry.guesses
  )

  if (insertionPoint === -1) {
    entries.push(entry)
  } else {
    entries.splice(insertionPoint, 0, entry)
  }

  localStorage.setItem(HOF_KEY, JSON.stringify(entries))
  onStored(entries)
}