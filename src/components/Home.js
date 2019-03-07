import React, { useState, useEffect } from 'react'
import './Home.css'
import photoArtiste from '../assets/images/artiste.jpg'
import wallpaper from '../assets/images/tableau1_fond.jpg'
import brush from '../assets/images/brush.jpg'

function Home() { 
    const [homePageData, setHomePageData] = useState({})

    // const [title, setTitle] = useState('')
    // const [titleBloc1, setTitleBloc1] = useState('')
    // const [titleBloc2, setTitleBloc2] = useState('')
    // const [titleBloc3, setTitleBloc3] = useState('')
    // const [bloc1, setBloc1] = useState('')
    // const [bloc2, setBloc2] = useState('')
    // const [bloc3, setBloc3] = useState('')
    // const [img1, setImg1] = useState(null)
    // const [img2, setImg2] = useState(null)
    // const [img3, setImg3] = useState(null)

    useEffect(()=>{
        getDataHome();
    },[])

    const getDataHome = async ()=>{
        await fetch('http://localhost:5000/home-data')
        .then(response => response.json())
        .then(result => {
            const imageStr1 = arrayBufferToBase64(result[0].pic1.data)
            result[0].pic1 = imageStr1
            const imageStr2 = arrayBufferToBase64(result[0].pic2.data)
            result[0].pic2 = imageStr2
            const imageStr3 = arrayBufferToBase64(result[0].pic3.data)
            result[0].pic3 = imageStr3
            return setHomePageData(result[0])
        })
    }

    function arrayBufferToBase64(buffer) {
        let binary = ''
        const bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b) => binary += String.fromCharCode(b))
        return binary;
    };

    return(
        <div className="accueil">
            <div className="home-title">
                <h2>{homePageData ? homePageData.title : ""}</h2>
            </div>
            <div className="col-container">
                <div className="col">
                    <img src={(homePageData && homePageData.pic1) ? homePageData.pic1 : null} alt="" className="presentation-img"/>
                </div>
                <div className="col">
                    <div className="text">
                        <h3>{homePageData ? homePageData.title_bloc1 : ''}</h3>
                        <p>{homePageData ? homePageData.bloc1 : ''}</p>
                    </div>
                </div>
            </div>
            <div className="col-container">
                <div className="col">
                    <div className="text">
                        <h3>{homePageData ? homePageData.title_bloc2 : ''}</h3>
                        <p>{homePageData ? homePageData.bloc2 : ''}</p>
                    </div>
                </div>
                <div className="col">
                    <div style={{backgroundImage: "url("+homePageData.pic2+")"}} alt="" className="parallax-img-right">
                    </div>
                </div>
            </div>
            <div className="col-container">
                <div className="col">
                    <div style={{backgroundImage: "url("+homePageData.pic3+")"}} alt="" className="parallax-img-left">
                    </div>
                </div>
                <div className="col">
                    <div className="text">
                        <h3>{homePageData ? homePageData.title_bloc3 : ''}</h3>
                        <p>{homePageData ? homePageData.bloc3 : ''}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home; 