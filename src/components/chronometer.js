import React, { Component } from 'react';
import './chronometer.css'

import {generate as id} from 'shortid'

class Chronometer extends Component {

    state = {
        hours:0,
        minutes:0,
        seconds:0,
        miliseconds:0,
        running: false,
        allTimeStamps: [],
        started: false
    }

    //Función que se llama con el boton start
    handleStartClick = () => {
        if(!this.state.running){
            this.interval = setInterval(()=> {
                this.tick()
            },100)

            this.setState({running: true,started: true})
        }
    }

    //Conteo del cronómetro
    tick() {
        let hours = this.state.hours
        let minutes = this.state.minutes
        let seconds = this.state.seconds
        let miliseconds = this.state.miliseconds + 1

        if(miliseconds === 10) {
            miliseconds = 0
            seconds = seconds + 1
        }

        if( seconds === 60) {
            seconds = 0
            minutes = minutes + 1
        }

        if( minutes === 60) {
            minutes = 0
            hours = hours + 1
        }

        this.updateTimer(miliseconds, seconds, minutes, hours)
            this.setState({
                miliseconds, seconds, minutes, hours
            })
    }
    //Función que se llama con el boton stop
    handleStopClick = () => {
        if(this.state.running){
            clearInterval(this.interval)
            this.setState({running: false})
        }
    }

    //Función que se llama con el boton timestamp
    handleTimestamp = () => {
      const  {hours,minutes,seconds,miliseconds, allTimeStamps} = this.state

      const timeStamp ={hours,minutes,seconds,miliseconds}

      const timeStamps = allTimeStamps

      timeStamps.push(timeStamp)

      this.setState({allTimeStamps:timeStamps})
    }

    //Función que se llama con el boton reset
    handleReset = () => {
        this.updateTimer(0, 0, 0, 0)
        this.setState({allTimeStamps: [], started: false})
    }

    //Función de actualización del estado
    updateTimer(miliseconds, seconds, minutes, hours) {
        this.setState({
            miliseconds, seconds, minutes, hours
        })
    }

    addZero(value){
        return value < 10? `0${value}` : value
    }

    render() {
        let {hours,minutes,seconds,miliseconds, running, allTimeStamps} = this.state
        hours = this.addZero(hours)
        minutes = this.addZero(minutes)
        seconds = this.addZero(seconds)
        miliseconds = this.addZero(miliseconds)
        return (
            <div className="caja-crono">
                <div className="caja-crono-hijo">
                    <h3>{`${hours} : ${minutes} : ${seconds} : ${miliseconds}`}</h3>
                    <div className="caja-botones">
                        <button className="button" disabled={running} onClick={this.handleStartClick}>Start</button>
                        <button className="button" disabled={!running} onClick={this.handleStopClick}>Stop</button>
                        <button className="button" disabled={!running} onClick={this.handleTimestamp}>Time </button>
                        { this.state.started && <button className="button" disabled={running} onClick={this.handleReset}>Reset</button>}
                    </div>
                    <ul className="lista" >
                        {allTimeStamps.map((timeStamp, idx)=> (
                            <li className="lista-hijo" key={id()}>
                                {`
                                ${idx + 1} -
                                ${this.addZero(timeStamp.hours)} :
                                ${this.addZero(timeStamp.minutes)} :
                                ${this.addZero(timeStamp.seconds)} :
                                ${this.addZero(timeStamp.miliseconds)} 
                                `}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Chronometer;