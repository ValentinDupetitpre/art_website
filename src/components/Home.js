import React from 'react'
import './Home.css'
import wallpaper from '../assets/images/tableau_large.jpg'

function Home() { 
    return(
        <div className="accueil">
            <img src={wallpaper} alt="" className="wallpaper"/>
            <div className="content">
                <h1>Roselyne Dupetitpré</h1>
                <h2>Peinture Abstraite</h2>
                <div className="text_block">
                    <p>Peindre sa musicalité intérieure, les couleurs de l'Âme.</p>
                    <p>L'Abstraction nous conduit sur le chemin coloré des sensations intimes. Elle donne tout autant à ressentir qu'à voir.Toucher l'Autre profondément, ouvrir une fenêtre, révéler un miroir qui éveilleront un indicible écho, un souffle, une vibration de Vie.</p>
                    <p>Portée par les œuvres de Zao Wou-ki et Chu Teh-Chun, l'abstraction s'est imposée à  moi comme une évidence, essentielle et indispensable, comme une respiration nécessaire à mon équilibre.</p>
                    <p>Je vous souhaite une très belle aventure... de toile ! </p>
                </div>
            </div>
        </div>
    )
}

export default Home; 