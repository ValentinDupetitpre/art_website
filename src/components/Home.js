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
                <div className="home">
                    <p>Peindre sa musicalité intérieure, les couleurs de l'Âme.</p>
                    <p>L'Abstraction nous conduit sur le chemin coloré des sensations intimes. Elle donne tout autant à ressentir qu'à voir.Toucher l'Autre profondément, ouvrir une fenêtre, révéler un miroir qui éveilleront un indicible écho, un souffle, une vibration de Vie.</p>
                    <p>Portée par les œuvres de Zao Wou-ki et Chu Teh-Chun, l'abstraction s'est imposée à  moi comme une évidence, essentielle et indispensable, comme une respiration nécessaire à mon équilibre.</p>
                    <p>Je vous souhaite une très belle aventure... de toile ! </p>
                </div>
                <div className="about">
                    <div className="about-1">
                        <h3>Chemin de Vie, Chemin de Toile</h3>
                        <p>La philosophie orientale qui fait coexister les éléments contraires et tend vers l'harmonie des différences est une source profonde d'inspiration : transparence et opacité, rugosité et douceur, traces et évanescence... le tout dans une recherche perpétuelle de la Lumière. Lumière jaillissant des ténèbres ou se dévoilant sous la matière.</p>
                        <p>Peindre c'est entrer en méditation devant l'immense espace de liberté de la toile blanche et accueillir tous les possibles. La peinture abstraite est ce lien subtil, ce voyage entre l'infiniment intérieur et l'infiniment extérieur, comme le souffle de la Vie. </p>
                        <p>Aimer la possibilité d'un nouveau voyage vers l'inconnu, ce moment de grâce  où le flux de la peinture guide le pinceau, et admirer le miracle qui se dévoile, venu d'on ne sait où.</p>
                        <p>Peindre, uniquement peindre. Sans rien chercher, sans rien envisager. Se laisser imprégner par la Vie, par le chant de la Nature, par les couleurs de notre Monde, par notre musique intérieure.</p>
                    </div>
                    <div className="about-2">
                        <h3>Chemin de Couleurs</h3>
                        <p>L’acrylique est mon médium de prédilection. Il me permet un geste fluide et élancé, libéré de toute contrainte. L’acrylique, avec son opacité particulière, permet les superpositions rapides qui donnent aux couleurs une profondeur et une vibration d’une grande richesse.</p>
                        <p>J'ai développé une relation profonde et intime à la matière : collages, craquelures, matériaux… suscitent autant d’accidents qui me permettent de construire la structure de mes tableaux.</p>
                        <p>Ma palette de couleurs, souvent vive mais volontairement restreinte, offre de très nombreuses nuances, dégradés et jeux de lumières.</p>
                        <p>Les fondus, omniprésents dans mes tableaux, mettent en valeur la matière et les aplats, instaurent des zones de calme qui donnent un rythme particulier à mes toiles, comme un souffle, une respiration.</p>
                    </div>

                </div>

                <div className="painting-is">

                </div>
            </div>
        </div>
    )
}

export default Home; 