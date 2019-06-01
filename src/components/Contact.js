import React from 'react'
import './Contact.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

function Contact() {

    const toto = ()=> {

    }

    return(
        <section className="contact-page">
            <div className="contact">
                <h1>Contact</h1>
                <p>Vous souhaitez être informé.e de mes prochaines expositions, me contacter ou me faire part de vos impressions ?</p>
                <p>N'hésitez pas à utiliser ce formulaire, je vous répondrai avec plaisir</p>
            </div>
            <form onSubmit={toto} noValidate autoComplete="off">
                <TextField 
                    className="input"
                    required
                    id="standard-required"
                    label="Nom"
                    margin="normal"
                    name="title"
                    fullWidth
                />
                <TextField 
                    className="input"
                    required
                    id="standard-required"
                    label="E-mail"
                    margin="normal"
                    name="detail"
                    fullWidth
                />
                <TextField 
                    className="input"
                    id="standard-required"
                    label="Sujet"
                    margin="normal"
                    name="detail"
                    fullWidth
                />
                <TextField 
                    className="input"
                    required
                    id="standard-required"
                    label="Message"
                    margin="normal"
                    multiline={true}
                    name="detail"
                    fullWidth
                />
                <div className="send">
                <Button className="save" type="submit" variant="contained" color="primary">
                    Envoyer
                    <Icon className="icon">send</Icon>
                </Button>
                </div>
            </form>
        </section>
    )
}

export default Contact; 