import React from 'react'

import CollectionCreate from './CollectionCreate'
import CollectionEdit from './CollectionEdit'

function Collection(props) {

    return (
        <div className="collec">
            <CollectionCreate />
            <CollectionEdit collectionNames={props.collectionNames} />
        </div>
    )
}

export default Collection