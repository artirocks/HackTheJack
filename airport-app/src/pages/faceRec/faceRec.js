import React from 'react'
import './styles.css'
import FaceRec from "../../components/faceRec/faceRec"
function faceRec(props) {
    return (
        <div id="login">
            <FaceRec history={props.history}/>
        </div>
    )
}

export default faceRec