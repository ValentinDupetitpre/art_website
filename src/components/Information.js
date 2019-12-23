import React, { useState, useEffect } from 'react'

import ArticlePreview from './common/ArticlePreview'
import configURL from '../helper/constant'
import './Information.css'

function Information(props) {
    const [articles, setArticles] = useState([])

    useEffect(()=>{
        getArticlesText()
    },[])

    const getArticlesText = async ()=>{
        const response = []
        await fetch(`${configURL}/article/title`)
        .then(response => response.json())
        .then(result => result.map(article => 
            response.push(article)))
        setArticles(response.reverse())
    }

    return(
        <section className="informations_wrapper">
                <h2>Informations et Communication</h2>
                {articles.map(article => 
                    <article className="article-preview" key={article.id}>
                        <ArticlePreview article={article}/>
                    </article>  
                )}
        </section>
    )
}

export default Information; 