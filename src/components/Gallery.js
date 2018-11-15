import React, {Component} from 'react'
import { Tabs, Tab, Grid, Cell } from 'react-mdl'
import large from '../assets/images/large.jpg'
import haut from '../assets/images/haut.jpg'
import tableau from '../assets/images/tableau1.jpg'
import tableau2 from '../assets/images/tableau2.jpg'
import tableau3 from '../assets/images/tableau3.jpg'
import Card from './common/card'
import './Gallery.css'

class Gallery extends Component {
    constructor(props){
        super(props)
        this.state = { 
            activeTab: 0,
            paintings: [
                {
                    id: 1,
                    src: large,
                    title: "L'indicible Echo",
                    detail: "50x50"
                },
                {
                    id:2,
                    src: tableau2,
                    title: "Comme un souffle",
                    detail: "70x70"
                },
                {
                    id:3,
                    src: tableau,
                    title: "Visite virtuelle de l'expo",
                    detail: "Technique mixte \n 45x87 \n collection particuliere vroijvijebviuerbibreib"
                },
                {
                    id:4,
                    src: tableau3,
                    title: "Envolée Lyrique",
                    detail: "50x50"
                },
                {
                    id:5,
                    src: haut,
                    title: "Envolée Lyrique en haut",
                    detail: "50x50"
                },
            ]
        }
    }

    printOverview(){
        const paintings = this.state.paintings.map(painting =>
            <Cell key={painting.id} col={4}>
                <Card srcImg={painting.src} title={painting.title} detail={painting.detail} />
            </Cell>
        );
        return paintings;
    }

    toggleExhibitions(){
        switch (this.state.activeTab) {
            case 0:
                return (
                    <div>

                    </div>
                )
            case 1:
                return (
                    <div style={{width: '95%', margin: 'auto'}}>
                        <Grid className="demo-grid-1">
                            {this.printOverview()}
                        </Grid>
                    </div>
                )
            case 2:
                
                break;
            default:
                break;
        }
    }

    render(){
        return(
            <div className="gallery">
                <Tabs className="tabs" activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })}>
                    <Tab>Vue d'ensemble</Tab>
                    <Tab>L'indicible Echo</Tab>
                    <Tab>Envolée lyrique</Tab>
                    <Tab>Comme un souffle</Tab>
                </Tabs>
                <section className="gallery-grid">
                    <Grid>
                        <Cell col={12}>
                            <div className="content">{this.toggleExhibitions()} </div>
                        </Cell>
                    </Grid>
                </section>
            </div>
        )
    }
}

export default Gallery; 