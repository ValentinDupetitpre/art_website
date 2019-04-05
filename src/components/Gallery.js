import React, { useEffect, useState, lazy, Suspense} from 'react'
import './Gallery.css'

const SmallImageComponent = lazy(() => import('./common/SmallImageComponent'));

function Gallery(props) {
    const [paintings, setPaintings] = useState([])

    useEffect(()=>{
        const { match: { params } } = props;
        initGallery(params.collectionId)
    }, [])

    const initGallery = async (collecId)=>{
        const response = []
        await fetch(('http://localhost:5000/gallery/'+collecId+'/text'))
        .then(response => response.json())
        .then(result => result.map(paintingData => response.push(paintingData)))

        setPaintings(response)
    }

    function printImages(){
        const printPaintings = paintings.map(painting => 
            <Suspense key={painting.id} fallback={<div>Loading...</div>}>
                <SmallImageComponent title={painting.name} idPainting={painting.id} detail={painting.detail}/>
            </Suspense>
        )
        return printPaintings
    }

    return(
        <div className="gallery">
        <section className="gallery-grid">
            <div className="content">
                {printImages()}
            </div>
        </section>
    </div>
    )
}

export default Gallery; 