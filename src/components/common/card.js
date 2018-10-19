import React, {Component} from 'react'
import './card.css'

class Card extends Component { 

    render(){
        return(
            <div className="frame">
                <div className="card">
                    <div className="painting">
                        <img src={this.props.srcImg} alt={this.props.title} style={{width:'100%'}}/>
                    </div>
                    <div className="legend">
                        <h5>{this.props.title}</h5>
                        <p>{this.props.detail}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card; 