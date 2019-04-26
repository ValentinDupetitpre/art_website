import React, { useEffect, useState, lazy, Suspense} from 'react'
import './Gallery.css'
import ModalComponent from './common/ModalComponent';

const SmallImageComponent = lazy(() => import('./common/SmallImageComponent'));

function Gallery(props) {
    const [paintings, setPaintings] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [idForModal, setIdForModal] = useState(null)

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

    function callModal(idPainting){
        setOpenModal(true)
        callParent(true)
        const indexOfPainting = paintings.findIndex(paint=> paint.id === idPainting)
        console.log(indexOfPainting)
        setIdForModal(idPainting)
    } 

    function closeModal(){
        setOpenModal(false)
        callParent(false)
        setIdForModal(null)
    }

    const callParent = (open)=>{
        props.notifyModalCall(open)
    }

    function printImages(){
        const printPaintings = paintings.map(painting => 
            <Suspense key={painting.id} fallback={<div>Loading...</div>}>
                <SmallImageComponent title={painting.name} idPainting={painting.id} detail={painting.detail} callModal={callModal} />
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
            <ModalComponent open={openModal} idPainting={idForModal} close={closeModal}/>
        </div>
    )
}

export default Gallery; 