import React, { useEffect, useState } from 'react'

import noImage from '../../assets/images/no-image.svg';

function ImageComponent(props){
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
        }))
    }

    return(
        <img src={painting ? painting.smallPic : noImage} alt={props.title} style={{width:'100%'}}/>
    )
}

export default ImageComponent