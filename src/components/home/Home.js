import React from 'react'
import PropTypes from 'prop-types'

import "./home.css"

const Home = ({ onClick }) => {
  return (
    <div id="home">
      {/* classic home display */}
      <h4>Welcome <span role="img" aria-label="hangman logo">🙋‍♂️</span></h4>
      <p className="lead">Please choose one of this following navigationMode :</p>
      <button className="btn btn-primary" onClick={() => onClick("singlePlayer")}>Single Player</button>
      <button className="btn btn-primary" onClick={() => onClick("multiplayer")}>Multiplayer</button>
    </div>
  )
}

Home.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Home