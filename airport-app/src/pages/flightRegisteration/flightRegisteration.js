import React from 'react'
import FlightRegisteration from '../../components/flightRegisteration/flightRegisteration'
import './style.css'

function flightRegisteration(props) {
    return (
        <div id="flightRegisteration">
            <FlightRegisteration history={props.history}/>
        </div>
    )
}

export default flightRegisteration