import React from 'react'

import CollectionCreate from './CollectionCreate'
import CollectionEdit from './CollectionEdit'

function Collection(props) {

    function triggerCollec(){
        props.triggerCollec()
    }

    return (
        <div className="collec">
            <CollectionCreate changeInCollec={triggerCollec} />
            <CollectionEdit changeInCollec={triggerCollec} collectionNames={props.collectionNames} />
        </div>
    )
}

export default Collection