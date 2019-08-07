import React, {lazy, Suspense } from 'react'

import './CardHorizontal.css'

const ImageComponent = lazy(() => import('./ImageComponent'));

function CardHorizontal(props) {


  return (
    <div className="horizontal-frame">
        <div className="horizontal-card">
            <div className="horizontal-painting">
                <Suspense fallback={<div>Loading...</div>}>
                    <ImageComponent title={props.collection.name} idCollection={props.collection.id}/>
                </Suspense>
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
