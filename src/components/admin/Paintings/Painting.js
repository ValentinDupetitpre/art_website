import React from 'react'

import PaintingCreate from './PaintingCreate'
import PaintingEdit from './PaintingEdit'

function Painting() {

    return(
        <div className="collec">
            <PaintingCreate />
            <PaintingEdit />
        </div>
    )
}

export default Painting