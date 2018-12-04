//File used for the routes 
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Gallery from './Gallery'
import Exhibition from './Exhibition'
import About from './About'
import PaintingIs from './PaintingIs'
import Contact from './Contact'
import Admin from './Admin'

const Main = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route  path="/gallery" component={Gallery} />
        <Route  path="/exhibitions" component={Exhibition} />
        <Route  path="/about" component={About} />
        <Route  path="/painting" component={PaintingIs} />
        <Route  path="/contact" component={Contact} />
        <Route  path="/admin" component={Admin} />
    </Switch>
)

export default Main
