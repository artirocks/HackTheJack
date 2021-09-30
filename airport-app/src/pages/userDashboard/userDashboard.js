import React from 'react'
import UserDashboard from '../../components/userDashboard/userDashboard'
import './style.css'

function userDashboard(props) {
    return (
        <div id="userdashboard">
            <UserDashboard history={props.history}/>
        </div>
    )
}

export default userDashboard