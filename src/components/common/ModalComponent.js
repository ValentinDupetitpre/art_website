import React, { useEffect, useState } from 'react'
import './ModalComponent.css'

function ModalComponent(props){
    const [visible, setVisible] = useState(false)
    const [painting, setPainting] = useState(null)

    useEffect(()=>{
        setVisible(props.open)
    }, [props.open])

    useEffect(()=>{
        setVisible(false)
    },[])

    useEffect(()=>{
        fetchPainting(props.idPainting)
    }, [props.idPainting])

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

    function closeModal(){
        setVisible(false)
        props.close()
        setPainting(null)
    }

    function modalOverview(){
        return visible ? (
            <div id="myModal" className="modal">
            <span className="close" onClick={closeModal}>&times;</span>
            <span className="modal-left">&lt;</span>
            <span className="modal-right">&gt;</span>
            <img className="modal-content" src={painting ? painting.pic : null} alt=""/>
            <div id="caption"></div>
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