import React, { useState, useEffect } from 'react'
import './Home.css'
import configURL from '../helper/constant'

function Home() { 
    const [homePageDataText, setHomePageDataText] = useState({})
    const [pic1, setPic1] = useState(null)
    const [pic2, setPic2] = useState(null)
    const [pic3, setPic3] = useState(null)

    useEffect(()=>{
        getDataTextHome();
        getDataPicsHome();
    },[])

    const getDataTextHome = async()=>{
        await fetch(`${configURL}/home-data/text`)
        .then(response => response.json())
        .then(result => setHomePageDataText(result[0]))
    }

    const getDataPicsHome = async ()=>{
        await fetch(`${configURL}/home-data/pics`)
        .then(response => response.json())
        .then(result => {
            const imageStr1 = result[0].pic1.data ? Buffer.from(result[0].pic1.data).toString('base64') : null;
            const imageStr2 = result[0].pic2.data ? Buffer.from(result[0].pic2.data).toString('base64') : null;
            const imageStr3 = result[0].pic3.data ? Buffer.from(result[0].pic3.data).toString('base64') : null;
            setPic1("data:image/jpeg;base64,"+imageStr1)
            setPic2("data:image/jpeg;base64,"+imageStr2)
            setPic3("data:image/jpeg;base64,"+imageStr3)
        })
    }

    return(
        <div className="accueil">
            <div className="home-title">
                <h2>{homePageDataText ? homePageDataText.title : ""}</h2>
            </div>
            <div className="col-container block-img-text">
                <div className="col">
                    <img src={pic1 ? pic1 : null} alt="" className="presentation-img"/>
                </div>
                <div className="col">
                    <div className="text">
                        <h3>{homePageDataText ? homePageDataText.title_bloc1 : ''}</h3>
                        <p>{homePageDataText ? homePageDataText.bloc1 : ''}</p>
                    </div>
                </div>
            </div>
            <div className="col-container block-text-img">
                <div className="col">
                    <div className="text">
                        <h3>{homePageDataText ? homePageDataText.title_bloc2 : ''}</h3>
                        <p>{homePageDataText ? homePageDataText.bloc2 : ''}</p>
                    </div>
                </div>
                <div className="col">
                    <div style={{backgroundImage: "url("+pic2+")"}} alt="" className="parallax-img-right">
                    </div>
                </div>
            </div>
            <div className="col-container block-img-text">
                <div className="col">
                    <div style={{backgroundImage: "url("+pic3+")"}} alt="" className="parallax-img-left">
                    </div>
                </div>
                <div className="col">
                    <div className="text">
                        <h3>{homePageDataText ? homePageDataText.title_bloc3 : ''}</h3>
                        <p>{homePageDataText ? homePageDataText.bloc3 : ''}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home; 