//File used for the routes 
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Galleries from './Galleries'
import Gallery from './Gallery'
import Exhibition from './Exhibition'
import Contact from './Contact'
import Admin from './admin/Admin'

const Main = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/gallery" component={Galleries} />
        <Route path="/gallery/:collectionId" component={Gallery} />
        <Route path="/exhibitions" component={Exhibition} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
    </Switch>
)

export default Main
