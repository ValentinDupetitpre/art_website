import React, { useEffect, useState, lazy, Suspense} from 'react'
import './Gallery.css'
import ModalComponent from './common/ModalComponent';

const SmallImageComponent = lazy(() => import('./common/SmallImageComponent'));

function Gallery(props) {
    const [paintings, setPaintings] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [idForModal, setIdForModal] = useState(null)
    const [idsArray, setIdsArray] = useState([])
    const [collectionName, setCollectionName] = useState('')

    useEffect(()=>{
        const { match: { params } } = props;
        initGallery(params.collectionId)
    }, [])

    const initGallery = async (collecId)=>{
        const response = []
        await fetch(('http://localhost:5000/gallery/'+collecId+'/text'))
        .then(response => response.json())
        .then(result => {
            if(result.painting){
                result.painting.map(paintingData => response.push(paintingData))
            }
            if(result.collection){
                setCollectionName(result.collection.name)
            }
        })

        sortPaintings(response)
    }

    function callModal(idPainting){
        setOpenModal(true)
        callParent(true)
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

    function createArrayOfIds(array){
        const idsArray = array.reduce((acc, painting)=>{
            acc.push(painting.id)
            return acc
        },[])
        setIdsArray(idsArray)
    }

    function sortPaintings(array) {
        const galleryContent = document.getElementById('gallery-content') || {};
        const columns = Math.floor(galleryContent.clientWidth/370)
        const out = [];
        let col = 0
        while(col < columns) {
            for(let i = 0; i < array.length; i += columns) {
                let _val = array[i + col];
                if (_val !== undefined)
                    out.push(_val);
            }
            col++;
        }
        setPaintings(out)
        createArrayOfIds(array)
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
                <div className="collection-name">
                    {collectionName}
                </div>
                <div id="gallery-content" className="content">
                    {printImages()}
                </div>
            </section>
            <ModalComponent open={openModal} idsArray={idsArray} idPainting={idForModal} close={closeModal}/>
        </div>
    )
}

export default Gallery; 