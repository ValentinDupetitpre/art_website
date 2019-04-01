import React, { useState, useEffect } from 'react'
import './Home.css'
import photoArtiste from '../assets/images/artiste.jpg'
import wallpaper from '../assets/images/tableau1_fond.jpg'
import brush from '../assets/images/brush.jpg'

function Home() { 
    const [homePageData, setHomePageData] = useState({})

    useEffect(()=>{
        getDataHome();
    },[])

    const getDataHome = async ()=>{
        await fetch('http://localhost:5000/home-data')
        .then(response => response.json())
        .then(result => {
            const imageStr1 = result[0].pic1.data ? Buffer.from(result[0].pic1.data).toString('base64') : null;
            const imageStr2 = result[0].pic2.data ? Buffer.from(result[0].pic2.data).toString('base64') : null;
            const imageStr3 = result[0].pic3.data ? Buffer.from(result[0].pic3.data).toString('base64') : null;
            result[0].pic1 = "data:image/jpeg;base64,"+imageStr1
            result[0].pic2 = "data:image/jpeg;base64,"+imageStr2
            result[0].pic3 = "data:image/jpeg;base64,"+imageStr3
            return setHomePageData(result[0])
        })
    }

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