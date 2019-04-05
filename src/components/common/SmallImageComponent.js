import React, { useEffect, useState } from 'react'
import './SmallImageComponent.css'
import noImage from '../../assets/images/no-image.svg';

function SmallImageComponent(props){
    const [painting, setPainting] = useState(null)

    useEffect(()=>{
        fetchPainting(props.idPainting)
    }, [props])

    const fetchPainting = async (id)=>{
        await fetch('http://localhost:5000/painting/'+id+'/smallpic')
        .then(response => response.json())
        .then(result => result.map(painting => {
            const smallImageStr = painting.smallPic ? Buffer.from(painting.smallPic).toString('base64') : null;
            painting.smallPic = "data:image/jpeg;base64,"+smallImageStr
            setPainting(painting)
            return null
        }))
    }

    return(
        <div className="smallImage">
            <img src={painting ? painting.smallPic : noImage} alt={props.title}/>
            <div className="details">
                <h5>{props.title}</h5>
                <p>{props.detail}</p>
            </div>
        </div>
    )
}

export default SmallImageComponent