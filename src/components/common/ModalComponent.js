import React, { useEffect, useState } from 'react'
import './ModalComponent.css'
import configURL from '../../helper/constant'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

function ModalComponent(props){
    const [visible, setVisible] = useState(false)
    const [painting, setPainting] = useState(null)
    const [currentId, setCurrentId] = useState(null)
    const [swipeAbs, setSwipeAbs] = useState(0)
    const [swiping, setSwiping] = useState(false)
    const [imgComesFrom, SetImgComesFrom] = useState('left')

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
        if(props.idPainting) {
            setCurrentId(props.idPainting)
            fetchPainting(props.idPainting)
        }
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
        await fetch(`${configURL}/painting/`+id+'/pic')
        .then(response => response.json())
        .then(result => result.map(painting => {
            const imageStr = painting.pic ? Buffer.from(painting.pic).toString('base64') : null;
            painting.pic = "data:image/jpeg;base64,"+imageStr
            setPainting(painting)
            return null
        }))
    }

    function goRight(){
        SetImgComesFrom('right')
        const paintingId = props.idsArray.indexOf(currentId) +1
        if(props.idsArray[paintingId]) {
            setCurrentId(props.idsArray[paintingId])
            fetchPainting(props.idsArray[paintingId])    
        }else{
            setCurrentId(props.idsArray[0])
            fetchPainting(props.idsArray[0])
        }
    }
    function goLeft(){
        SetImgComesFrom('left')
        const paintingId = props.idsArray.indexOf(currentId) -1
        if(props.idsArray[paintingId]){
            setCurrentId(props.idsArray[paintingId])
            fetchPainting(props.idsArray[paintingId])
        }else{
            setCurrentId(props.idsArray[props.idsArray.length -1])
            fetchPainting(props.idsArray[props.idsArray.length -1])
        }
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
        const abscisse = touch.clientX - swipeAbs;
        if (swiping && Math.abs(abscisse) > 50 ) {
            abscisse > 0 ? goLeft() : goRight()
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
                <div className="img_wrapper">
                    <ReactCSSTransitionGroup
                        transitionName={imgComesFrom}
                        transitionEnterTimeout={400}
                        transitionLeaveTimeout={400}>

                        <img className="modal-content" key={painting ? painting.pic : null} onTouchStart={startTouching} onTouchMove={touching}
                        onTouchEnd={endTouching} src={painting ? painting.pic : null} alt=""/>

                    </ReactCSSTransitionGroup>
                </div>
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