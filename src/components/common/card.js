import React from 'react'
import './card.css'

function Card(props)  { 
    return(
        <div className="frame">
            <div className="card">
                <div className="painting">
                    <img src={props.srcImg} alt={props.title} style={{width:'100%'}}/>
                </div>
                <div className="legend">
                    <h5>{props.title}</h5>
                    <p>{props.detail}</p>
                </div>
            </div>
        </div>
    )
}

export default Card; 