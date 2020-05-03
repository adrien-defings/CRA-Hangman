import React from 'react'
import PropTypes from 'prop-types'
import {ALPHABET} from '../../utils.js'

const Letters = ({ usableLetters, color, onClick }) => {
    return (
        <div id="letters">
          <h5>
            Use
            <span className={"text-" + color}> keyboards </span>
            or
            <span className={"text-" + color}> letter buttons : </span>
          </h5>
          {
            usableLetters.map((letter, index) => (
              <span
              key={index}
              className={"letter btn btn-" + color}
              onClick={() => onClick(letter)}>
                {letter}
              </span>
            ))
          }
        </div>
    )
}

Letters.defaultProps = {
    usableLetters: ALPHABET,
    color: "primary",
    onClick: () => {},
}

Letters.propTypes = {
    usableLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Letters