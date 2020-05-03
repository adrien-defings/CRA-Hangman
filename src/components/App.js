import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import './app.css'

import Header from './header/Header.js'
import Hangman from './hangman/Hangman.js'
import Home from './home/Home.js'

class App extends Component {
  state = {
    navigationMode: "home",
  }

  setNavigationMode = navigationMode => {
    this.setState({
      navigationMode,
    })
  }

  render() {
    const { navigationMode } = this.state
    return (
      <div id="app" className="jumbotron">
        <Header navigationMode={navigationMode} onClick={this.setNavigationMode} />

        {navigationMode === "home" ?
          <Home onClick={this.setNavigationMode} />
          :
          <Hangman navigationMode={navigationMode} />
        }
      </div>
    )
  }

}

export default App
