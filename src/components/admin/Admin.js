import React, {useState, useEffect} from 'react'

import Collection from './Collections/Collection'
import Painting from './Paintings/Painting'
import DropdownBar from '../common/DropdownBar'

function Admin()  {
    const [collectionNames, setCollectionNames] = useState([])

    useEffect(()=>{
        getCollectionName()
    },[])

    function triggerCollec(){
        getCollectionName()
    }

    const getCollectionName = async ()=>{
        const response = []
        await fetch('http://localhost:5000/collection/title')
        .then(response => response.json())
        .then(result => result.map(collec => response.push(collec)))
        setCollectionNames(response)
    }

    return(
        <div>
            <h1>Admin Page</h1>
            <DropdownBar title="Ajouter ou modifier une collection">
                <Collection triggerCollec={triggerCollec} collectionNames={collectionNames} />
            </DropdownBar>

            <DropdownBar title="Ajouter ou modifier un tableau">
                <Painting collectionNames={collectionNames} />
            </DropdownBar>
        </div>
    )
}

export default Admin;