import React, {useState, useEffect} from 'react'

import configURL from '../../helper/constant'
import Collection from './Collections/Collection'
import Painting from './Paintings/Painting'
import HomeAdmin from './HomeAdmin'
import DropdownBar from '../common/DropdownBar'
import Article from './Articles/Article'

function Admin()  {
    const [collectionNames, setCollectionNames] = useState([])
    const [articleNames, setArticleNames] = useState([])

    useEffect(()=>{
        getCollectionName()
        getArticlesName()
    },[])

    function triggerCollec(){
        getCollectionName()
    }

    function triggerArticle(){
        getArticlesName()
    }

    const getCollectionName = async ()=>{
        const response = []
        await fetch(`${configURL}/collection/title`)
        .then(response => response.json())
        .then(result => result.map(collec => response.push(collec)))
        setCollectionNames(response)
    }

    const getArticlesName = async ()=>{
        const response = []
        await fetch(`${configURL}/article/title`)
        .then(response => response.json())
        .then(result => result.map(article => response.push(article)))
        setArticleNames(response)
    }

    return(
        <div className="admin-page">
            <h1>Page d'administration du site</h1>
            <DropdownBar title="Ajouter ou modifier une collection">
                <Collection triggerCollec={triggerCollec} collectionNames={collectionNames} />
            </DropdownBar>

            <DropdownBar title="Ajouter ou modifier un tableau">
                <Painting collectionNames={collectionNames} />
            </DropdownBar>

            <DropdownBar title="Modifier la page d'accueil">
                <HomeAdmin />
            </DropdownBar>

            <DropdownBar title="Ajouter ou modifier les articles">
                <Article triggerArticle={triggerArticle} articleNames={articleNames} />
            </DropdownBar>
        </div>
    )
}

export default Admin;