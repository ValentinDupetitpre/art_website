import React, { useState, useEffect } from 'react'
import {withRouter} from "react-router-dom";

import CardHorizontal from './common/CardHorizontal'
import './Galleries.css'

function Galleries(props){
    const [collections, setCollections] = useState([])

    useEffect(()=>{
        getCollectionsText()
    },[])

    const getCollectionsText = async ()=>{
        const response = []
        await fetch('http://localhost:5000/collection/title')
        .then(response => response.json())
        .then(result => result.map(painting =>
            // var imageStr = painting.pic ? arrayBufferToBase64(painting.pic.data) : null;
            // painting.pic = imageStr
            response.push(painting)))
        setCollections(response.reverse())
    }

    // function arrayBufferToBase64(buffer) {
    //     var binary = ''
    //     var bytes = [].slice.call(new Uint8Array(buffer))
    //     bytes.forEach((b) => binary += String.fromCharCode(b))
    //     return binary
    // }

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