import React, { useState } from 'react'
import './App.css'
import { Layout, Drawer, Navigation, Content } from 'react-mdl'
import Main from './components/Main'
import { Link } from 'react-router-dom'

function App() {
  const [openTab, setOpenTab] = useState(-1)
  const [inAdminPage] = useState(false)

  function pageLayout() {
    const changeTab = (e)=>{
      setOpenTab(Number(e.currentTarget.dataset.id))
    }

    if(inAdminPage){
      return (
        <Content>
            <Main />
        </Content>
      )
    }else{
      return (
        <Layout fixedDrawer>
            <Drawer className="menu" title="Menu">
            <hr/>
                <Navigation>
                    <Link onClick={changeTab} data-id="0" className={openTab === 0 ? 'active-page' : ''} to="/">Accueil</Link>
                    <Link onClick={changeTab} data-id="1" className={openTab === 1 ? 'active-page' : ''} to="/gallery">Galeries</Link>
                    <Link onClick={changeTab} data-id="2" className={openTab === 2 ? 'active-page' : ''} to="/exhibitions">Expositions</Link>
                    <Link onClick={changeTab} data-id="3" className={openTab === 3 ? 'active-page' : ''} to="/painting">Peindre c'est ...</Link>
                    <Link onClick={changeTab} data-id="4" className={openTab === 4 ? 'active-page' : ''} to="/about">A propos</Link>
                    <Link onClick={changeTab} data-id="5" className={openTab === 5 ? 'active-page' : ''} to="/contact">Contact</Link>
                </Navigation>
            </Drawer>
            <Content>
               <Main />
            </Content>
        </Layout>
      )
    }
  }

  return (
    <div style={{height: '300px'}}>
      {pageLayout()}
  </div>
  )
}

export default App
