import React, { useState } from 'react'

import PaintingCreate from './PaintingCreate'
import PaintingEdit from './PaintingEdit'

function Painting(props) {
    const [updatePaintingTrigger, setUpdatePaintingTrigger] = useState(false)

    function triggerPaintings(){
        setUpdatePaintingTrigger(!updatePaintingTrigger)
    }

    return(
        <div className="collec">
            <PaintingCreate updatePainting={triggerPaintings} collectionNames={props.collectionNames} />
            <PaintingEdit updatePaintings={updatePaintingTrigger} collectionNames={props.collectionNames} />
        </div>
    )
}

export default Painting