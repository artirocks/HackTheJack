import React, { useState } from 'react'

import { WebcamCapture} from '../../../components/webcam/webcam'
import './homeStyles.css'

const CheckIn = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [flightNo, setFlightNo] = useState('');


    const submitForm = () => {
        setName('');
        setEmail('');
        setFlightNo('');
        props.history.push('/flightRegisteration')
    }

    return (
        <div className="home-container">
            <div className="container">
                <div className="text">
                    <h1>Check In</h1>
                    <form className="form">
                        <WebcamCapture/>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="flightNo" placeholder="Flight No." onChange={(e) => setFlightNo(e.target.value)} />
                        <button type="submit" id="login-button" onClick={(e) => submitForm(e)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default CheckIn
