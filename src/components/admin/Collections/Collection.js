import React from 'react'

import CollectionCreate from './CollectionCreate'
import CollectionEdit from './CollectionEdit'

function Collection() {

    return (
        <div className="collec">
            <CollectionCreate />
            <CollectionEdit />
        </div>
    )
}

export default Collection