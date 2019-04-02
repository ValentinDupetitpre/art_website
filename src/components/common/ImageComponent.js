import React, { useEffect, useState } from 'react'

import noImage from '../../assets/images/no-image.svg';

function ImageComponent(props){
    const [image, setImage] = useState(null)

    useEffect(()=>{
        fetchCollecPic(props.idCollection)
    }, [props])

    const fetchCollecPic = async (id)=>{
        await fetch('http://localhost:5000/collection/'+id+'/pic')
        .then(response => response.json())
        .then(result => result.map(collec => {
            const imageStr = collec.pic ? Buffer.from(collec.pic).toString('base64') : null;
            setImage("data:image/jpeg;base64,"+imageStr)
        }))
    }

    return(
        <img src={image ? image : noImage} alt={props.title}/>
    )
}

export default ImageComponent