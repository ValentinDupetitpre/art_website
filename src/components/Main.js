//File used for the routes 
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Galleries from './Galleries'
import Gallery from './Gallery'
import Information from './Information'
import Contact from './Contact'
import Admin from './admin/Admin'

const Main = (props) => {

    const modalChangeState = (open)=>{
        props.changeScrollBecauseModal(open)
    }

    return (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/gallery" component={Galleries} />
        <Route path="/gallery/:collectionId" render={(props) => <Gallery {...props} notifyModalCall={modalChangeState} />}/>
        <Route path="/info" component={Information} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
    </Switch>
    )
}

export default Main
