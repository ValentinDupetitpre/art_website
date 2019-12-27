import React, {lazy, Suspense, useEffect } from 'react'
import './ArticlePreview.css'

const ImageComponent = lazy(() => import('./ImageComponent'));

function ArticlePreview(props) {

    useEffect(()=> {
        const details = document.getElementsByClassName('article-details')
        console.log(typeof(details))
        for (let detail of details) { 
            const lineheight = parseInt(window.getComputedStyle(detail).getPropertyValue("line-height"))
            const lines=Math.floor(300/lineheight)
            // detail.style['-webkit-line-clamp']=lines
        }
    })

    return(
        <div className="article-preview-wrapper">
            <div className="card">
                <div className="picture">
                    <Suspense fallback={<div>Loading...</div>}>
                        <ImageComponent title={props.article.name} elementId={props.article.id} parentType="article"/>
                    </Suspense>
                </div>
                <div className="legend">
                    <span>{props.article ? props.article.type : ''}</span>
                    <h3>{props.article ? props.article.name : ''}</h3>
                    <p className="article-details">{props.article ? props.article.detail : ''}</p>
                </div>
            </div>
        </div>
    )
}

export default ArticlePreview 