import React, { useEffect, useState } from 'react'
import './SmallImageComponent.css'
import noImage from '../../assets/images/no-image.svg';
import configURL from '../../helper/constant'

function SmallImageComponent(props){
    const [painting, setPainting] = useState(null)

    useEffect(()=>{
        fetchPainting(props.idPainting)
    }, [props])

    const fetchPainting = async (id)=>{
        await fetch(`${configURL}/painting/`+id+'/smallpic')
        .then(response => response.json())
        .then(result => result.map(painting => {
            const smallImageStr = painting.smallPic ? Buffer.from(painting.smallPic).toString('base64') : null;
            painting.smallPic = "data:image/jpeg;base64,"+smallImageStr
            setPainting(painting)
            return null
        }))
    }

    function handleClickImage(){
        props.callModal(props.idPainting)
    }

    return(
        <div className="smallImage" onClick={handleClickImage}>
            <img src={painting ? painting.smallPic : noImage} alt={props.title}/>
            <div className="details">
                <h5>{props.title}</h5>
                <hr />
                <p>{props.detail}</p>
            </div>
        </div>
    )
}

export default SmallImageComponent