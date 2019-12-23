import React, { useEffect, useState } from 'react'
import configURL from '../../helper/constant'

import noImage from '../../assets/images/no-image.svg';

function ImageComponent(props){
    const [image, setImage] = useState(null)

    useEffect(()=>{
        fetchPic(props.elementId)
    }, [props])

    const fetchPic = async (id)=>{
        await fetch(`${configURL}/${props.parentType}/`+id+'/pic')
        .then(response => response.json())
        .then(result => result.map(element => {
            const imageStr = element.pic ? Buffer.from(element.pic).toString('base64') : null;
            setImage("data:image/jpeg;base64,"+imageStr)
            return null;
        }))
    }

    return(
        <img src={image ? image : noImage} alt={props.title}/>
    )
}

export default ImageComponent