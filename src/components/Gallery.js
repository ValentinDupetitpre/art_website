import React, { useEffect, useState} from 'react'
import './Gallery.css'

import { Grid, Cell } from 'react-mdl'
import CardVertical from './common/CardVertical'

function Gallery(props) {
    const [idCollection, setIdCollection] = useState()
    const [paintings, setPaintings] = useState([])

    useEffect(()=>{
        const { match: { params } } = props;
        setIdCollection(params.collectionId)
        initPaintings(params.collectionId)
    }, [])

    const initPaintings = async (collecId)=>{
        const response = []
        await fetch('http://localhost:5000/gallery/'+collecId)
        .then(response => response.json())
        .then(result => result.map(painting => {
            var imageStr = painting.pic ? arrayBufferToBase64(painting.pic.data) : null;
            painting.pic = imageStr
            return response.push(painting)
        }))
        setPaintings(response)
        console.log(collecId)
        console.log(response)
    }

    function arrayBufferToBase64(buffer) {
        var binary = ''
        var bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b) => binary += String.fromCharCode(b))
        return binary
    }

    function printOverview(){
        const printPainting = paintings.map(painting =>
            <Cell key={painting.id} col={4}>
                <CardVertical srcImg={painting.pic} title={painting.name} detail={painting.detail} />
            </Cell>
        );
        return printPainting;
    }

    return(
        <div className="gallery">
        <section className="gallery-grid">
            <Grid>
                <Cell col={12}>
                    <div className="content">
                        <div style={{width: '95%', margin: 'auto'}}>
                            <Grid className="demo-grid-1">
                                {printOverview()}
                            </Grid>
                        </div>
                    </div>
                </Cell>
            </Grid>
        </section>
    </div>
    )
}

export default Gallery; 