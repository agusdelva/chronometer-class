import React, { Component } from 'react'
import './App.css'
import Chronometer from './components/chronometer.js'

class App extends Component {

    render() {
        return (
            <div>
                <h1>Chronometer</h1>
                <Chronometer />
            </div>
        )
    }
}


export default App;