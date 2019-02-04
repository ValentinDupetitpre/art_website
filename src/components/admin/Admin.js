import React from 'react'

import Collection from './Collection'
import Painting from './Painting'
import DropdownBar from '../common/DropdownBar'

function Admin(props)  { 

    return(
        <div>
            <h1>Admin Page</h1>
            <DropdownBar title="Ajouter ou modifier une collection">
                <Collection />
            </DropdownBar>

            <DropdownBar title="Ajouter ou modifier un tableau">
                <Painting />
            </DropdownBar>
        </div>
    )
}

export default Admin;