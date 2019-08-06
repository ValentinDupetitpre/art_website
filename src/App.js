import React, { useState } from 'react'
import './App.css'
import { Layout, Drawer, Navigation, Content } from 'react-mdl'
import Main from './components/Main'
import { Link } from 'react-router-dom'

function App() {
  const [openTab, setOpenTab] = useState(-1)
  const [inAdminPage] = useState(false)
  const [classContent, setClassContent] = useState("main-content-modal-false")

  function pageLayout() {
    const changeTab = (e)=>{
      setOpenTab(Number(e.currentTarget.dataset.id))
    }

    const modalChangeState = (open)=>{
        setClassContent("main-content-modal-"+open)
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
                    <Link onClick={changeTab} data-id="2" className={openTab === 2 ? 'active-page' : ''} to="/info">Informations</Link>
                    <Link onClick={changeTab} data-id="3" className={openTab === 3 ? 'active-page' : ''} to="/contact">Contact</Link>
                </Navigation>
            </Drawer>
            <Content className={classContent}>
               <Main changeScrollBecauseModal={modalChangeState} />
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
