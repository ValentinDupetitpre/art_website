import React, { useEffect, useState } from 'react'
import './ModalComponent.css'

function ModalComponent(props){
    const [visible, setVisible] = useState(false)
    const [painting, setPainting] = useState(null)
    const [currentId, setCurrentId] = useState(null)
    const [swipeAbs, setSwipeAbs] = useState(0)
    const [swiping, setSwiping] = useState(false)

    useEffect(()=> {
        window.onpopstate = (e) => {
            closeModal()
        }
        return () => closeModal()
    }, [])


    useEffect(()=>{
        setVisible(props.open)
    }, [props.open])

    useEffect(()=>{
        setCurrentId(props.idPainting)
        fetchPainting(props.idPainting)
    }, [props.idPainting])

    useEffect(()=>{
        setVisible(false)
    },[])
    useEffect(()=>{
        document.addEventListener("keydown", keyDown);
        return () => {
            document.removeEventListener("keydown", keyDown);
        }
    })

    const keyDown = (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                goLeft()
                break;
            case 'ArrowRight':
                goRight()
                break;
            case 'Escape':
                closeModal()
                break;
            default:
                break;
        }
    }
    
    const fetchPainting = async (id)=>{
        await fetch('http://localhost:5000/painting/'+id+'/pic')
        .then(response => response.json())
        .then(result => result.map(painting => {
            const imageStr = painting.pic ? Buffer.from(painting.pic).toString('base64') : null;
            painting.pic = "data:image/jpeg;base64,"+imageStr
            setPainting(painting)
            return null
        }))
    }

    function goRight(){
        const paintingId = props.idsArray.indexOf(currentId) +1
        setCurrentId(props.idsArray[paintingId])
        fetchPainting(props.idsArray[paintingId])
    }
    function goLeft(){
        const paintingId = props.idsArray.indexOf(currentId) -1
        setCurrentId(props.idsArray[paintingId])
        fetchPainting(props.idsArray[paintingId])
    }

    function closeModal(){
        setVisible(false)
        props.close()
        setPainting(null)
    }

    const startTouching = (e) => {
        const touch = e.touches[0];
        setSwipeAbs(touch.clientX);
    }

    const touching = (e) => {
        if (e.changedTouches && e.changedTouches.length) {
            setSwiping(true);
        }
    }
    
    const endTouching = (e) => {
        const touch = e.changedTouches[0];
        const absX = touch.clientX - swipeAbs;
        if (swiping && Math.abs(absX) > 50 ) {
            absX > 0 ? goLeft() : goRight()
        }
        setSwipeAbs(0)
        setSwiping(false)
    }

    function modalOverview(){
        return visible ? (
            <div id="myModal" className="modal">
                <span className="close" onClick={closeModal}>&times;</span>
                <span className="modal-left" onClick={goLeft}>&lt;</span>
                <span className="modal-right" onClick={goRight}>&gt;</span>
                <img className="modal-content" onTouchStart={startTouching} onTouchMove={touching}
                onTouchEnd={endTouching} src={painting ? painting.pic : null} alt=""/>
                <div className="caption">
                    <div className="caption-title">{painting ? painting.name : ''}</div>
                    <div className="caption-detail">{painting ? painting.detail : ''}</div>
                </div>
            </div>
        ) : <div></div>
    }

    return(
        <div>
            {modalOverview()}
        </div>
    )
}

export default ModalComponent