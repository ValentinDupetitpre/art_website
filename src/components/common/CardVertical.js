import React, {lazy, Suspense, useEffect} from 'react'
import './CardVertical.css'
// import ImageComponent from './ImageComponent'

const ImageComponent = lazy(() => import('./ImageComponent'));

function CardVertical(props)  {

    useEffect(()=>{
        console.log(props)
    })
    return(
        <div className="frame">
            <div className="card">
                <div className="painting">
                    <Suspense fallback={<div>Loading...</div>}>
                        <ImageComponent title={props.title} idPainting={props.idPainting}/>
                    </Suspense>
                </div>
                <div className="legend">
                    <h5>{props.title}</h5>
                    <p>{props.detail}</p>
                </div>
            </div>
        </div>
    )
}

export default CardVertical; 