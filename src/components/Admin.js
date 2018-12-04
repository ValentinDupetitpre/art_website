import React, {Component} from 'react'

class Admin extends Component { 

    constructor(props){
        super(props)
        this.state = {
            name: '',
            blob: null,
        }
        this.handleImg = this.handleImg.bind(this)
    }

    showTableau(){
        console.log(this.state.blob)
        if(this.state.blob && this.state.blob.length>0){
            return (
                <div>
                    coucou
                    <img alt="" src={this.state.blob}/>
                </div>
            )
        }else{
            return (<div>rien</div>)
        }
    }

    handleImg(event){
        const file = event.target.files[0]

        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            this.setState({blob: e.target.result})
        }

    }

    render(){
        return(
            <div className="admin">
            <h1>Admin page</h1>
                <h3>Tableaux</h3>
                <form>
                    <label>
                        Nom du tableau:
                        <input type="text" name="name" />
                    </label>
                    <br/>
                    <input id="uploadFiles" accept=".dwg, .gif, .jpg, .png, .csv"
				        type="file" name="uploadFiles" onChange={this.handleImg} />
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
                {this.showTableau()}
            </div>
        )
    }
}

export default Admin;