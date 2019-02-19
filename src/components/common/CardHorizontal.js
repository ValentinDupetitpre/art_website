import React, { useEffect } from 'react'

import noImage from '../../assets/images/no-image.svg';
import './CardHorizontal.css'

function CardHorizontal(props) {

  useEffect(()=>{
    //   console.log(props)
  })

  return (
    <div className="horizontal-frame">
        <div className="horizontal-card">
            <div className="horizontal-painting">
                <img src={(props.collection && props.collection.pic) ? props.collection.pic : noImage} alt={props.title}/>
            </div>
            <div className="horizontal-legend">
                <h5>{props.collection ? props.collection.name : ''}</h5>
                <p>{props.collection ? props.collection.detail : ''}</p>
            </div>
        </div>
    </div>
  );
}

export default CardHorizontal;
