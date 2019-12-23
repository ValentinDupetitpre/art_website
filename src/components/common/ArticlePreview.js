import React, {lazy, Suspense } from 'react'
import './ArticlePreview.css'

const ImageComponent = lazy(() => import('./ImageComponent'));

function ArticlePreview(props) {

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
                    <p>{props.article ? props.article.detail : ''}</p>
                </div>
            </div>
        </div>
    )
}

export default ArticlePreview 