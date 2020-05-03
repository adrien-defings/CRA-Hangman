import React from 'react'
import PropTypes from 'prop-types'

const InfosJoueur = ({ isGameEnded, winner, color, navigationMode, currentPlayer }) => {
    return (
        <div>
            {
                isGameEnded ?
                    winner === 3 ? (
                    // If no winner ( last move is a failed move )
                        <h5>
                            Sorry
                            <span className={"text-" + color}>
                            { navigationMode === "multiplayer" && " Player" + (currentPlayer + 1) + " " }
                            </span>
                            ! You loose ...
                            <span role="img" aria-label="sad logo">😓</span>
                        </h5>
                    ) : (
                        <h5>
                            Congrats
                            <span className={"text-" + color}>
                            { navigationMode === "multiplayer" && " Player" + (currentPlayer + 1) + " " }
                            </span>
                            ! You won !
                            <span role="img" aria-label="waw logo">👏</span>
                        </h5>
                    )
                :
                    navigationMode === "multiplayer" &&
                        <h5><span className={"text-" + color}> Player{currentPlayer + 1}</span>'s turn !</h5>
            }
        </div>
    )
}

InfosJoueur.defaultProps = {
    isGameEnded: false,
    winner: 3,
    color: "primary",
    navigationMode: "singlePlayer",
    currentPlayer: 0,
}

InfosJoueur.propTypes = {
    isGameEnded: PropTypes.bool.isRequired,
    winner: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    navigationMode: PropTypes.string.isRequired,
    currentPlayer: PropTypes.number.isRequired,
}

export default InfosJoueur