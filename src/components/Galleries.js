import React, { useState, useEffect } from 'react'
import {withRouter} from "react-router-dom";
import configURL from '../helper/constant'

import CardHorizontal from './common/CardHorizontal'
import './Galleries.css'

function Galleries(props){
    const [collections, setCollections] = useState([])

    useEffect(()=>{
        getCollectionsText()
    },[])

    const getCollectionsText = async ()=>{
        const response = []
        await fetch(`${configURL}/collection/title`)
        .then(response => response.json())
        .then(result => result.map(collec =>
            response.push(collec)))
        setCollections(response.reverse())
    }

    function goTo(id){
        props.history.push('/gallery/'+id);
    }

    function displayCollections(){
        return collections.map(collec => 
            <div className="gallery-card" key={collec.id} onClick={() => goTo(collec.id)}>
                <CardHorizontal collection={collec} />
            </div>
        )
    }

    return(
        <section className="galleries-page">
            <div className='galleries'>
                <div className='galleries-title'>
                    Mes collections de peintures
                </div>
                {/* <h1>Galerie</h1> */}
                {displayCollections()}
            </div>
        </section>
        
    )
}

export default withRouter(Galleries)