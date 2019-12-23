import React from 'react'

import ArticleCreate from './ArticleCreate'
import ArticleEdit from './ArticleEdit'

function Article(props){

    function triggerArticle(){
        props.triggerArticle()
    }

    return (
        <div className="articles">  
            <ArticleCreate changeInArticles={triggerArticle}/>
            <ArticleEdit changeInArticles={triggerArticle} articleNames={props.articleNames}/>
        </div>
    )
}

export default Article