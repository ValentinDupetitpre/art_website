import React, { Component } from 'react'
import './App.css'
import { Layout, Drawer, Navigation, Content } from 'react-mdl'
import Main from './components/Main'
import { Link } from 'react-router-dom'

class App extends Component {
  constructor(){
    super()
    this.state = {openTab: -1}
  }


  render() {
    const changeTab = (e)=>{
      this.setState({openTab: Number(e.currentTarget.dataset.id)})
    }

    return (
      <div style={{height: '300px'}}>
        <Layout fixedDrawer>
            <Drawer className="menu" title="Menu">
            <hr/>
                <Navigation>
                    <Link onClick={changeTab} data-id="0" className={this.state.openTab === 0 ? 'active-page' : ''} to="/">Accueil</Link>
                    <Link onClick={changeTab} data-id="1" className={this.state.openTab === 1 ? 'active-page' : ''} to="/gallery">Galeries</Link>
                    <Link onClick={changeTab} data-id="2" className={this.state.openTab === 2 ? 'active-page' : ''} to="/exhibitions">Expositions</Link>
                    <Link onClick={changeTab} data-id="3" className={this.state.openTab === 3 ? 'active-page' : ''} to="/painting">Peindre c'est ...</Link>
                    <Link onClick={changeTab} data-id="4" className={this.state.openTab === 4 ? 'active-page' : ''} to="/about">A propos</Link>
                    <Link onClick={changeTab} data-id="5" className={this.state.openTab === 5 ? 'active-page' : ''} to="/contact">Contact</Link>
                </Navigation>
            </Drawer>
            <Content>
               <Main />
            </Content>
        </Layout>
    </div>
    )
  }
}

export default App
