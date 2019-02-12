import React from 'react'

import PaintingCreate from './PaintingCreate'
import PaintingEdit from './PaintingEdit'

function Painting(props) {

    return(
        <div className="collec">
            <PaintingCreate collectionNames={props.collectionNames} />
            <PaintingEdit collectionNames={props.collectionNames} />
        </div>
    )
}

export default Painting