import React from 'react'
import PropTypes from 'prop-types'

import "./header.css"

const Header = ({ navigationMode, onClick }) => {
  return (
    <div id="header">
      <h2>Hangman Game <span role="img" aria-label="hangman logo">📿</span></h2>
      <p className="lead">Create with Create-react-app x Bootstrap</p>

      {navigationMode !== "home" &&
        <div id="navigationLink">
          <span role="img" aria-label="hangman logo">🏠 </span>
          <span className="btn-link" onClick={() => onClick("home")}>Hangman</span>
          <span onClick={() => onClick("home")}> / {navigationMode === "singlePlayer" ? "Single Player" : "Multiplayer"}
          </span>
        </div>
      }

      <hr className="my-4" />
    </div>

  )
}

Header.defaultProps = {
  navigationMode: "home",
}

Header.propTypes = {
  navigationMode: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Header