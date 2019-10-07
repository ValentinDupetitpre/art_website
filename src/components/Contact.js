import React, {useState} from 'react'
import './Contact.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import CustomSnackbar from './common/CustomSnackbar'
import configURL from '../helper/constant'

function Contact() {
    const [errorName, setErrorName] = useState(false)
    const [errorMail, setErrorMail] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)

    const validateLength = (data)=> {
        return data && data.length > 0 ? false : true
    }

    const validEmailFormat = (data => {
        const emailFormat = /\S+@\S+\.\S+/;
        return !emailFormat.test(data);
    })

    const reinitErrors = () => {
        setErrorName(false)
        setErrorMail(false)
        setErrorMessage(false)
        setOpenSnack(false)
    }

    const checkErrors = (name, email, message)=> {
        reinitErrors()
        setErrorName(validateLength(name))
        setErrorMail(validateLength(email) || validEmailFormat(email))
        setErrorMessage(validateLength(message))
        return validateLength(name) || validateLength(email) || validEmailFormat(email) || validateLength(message)
    }

    const submit = async (event)=> {
        event.preventDefault()
        const data = new FormData(event.target)
        const name = data.get('name')
        const email = data.get('email')
        const subject = data.get('subject')
        const message =data.get('message')


        if(!checkErrors(name, email, message)) {
            const body = JSON.stringify({
                name,
                email,
                subject,
                message
            })
            const headers = {
                'content-type': 'application/json',
                accept: 'application/json',
            };
            await fetch(`${configURL}/contact`, {
                method: 'POST',
                headers,
                body,
            })
            .then(response => response.status === 201 ? successfulPost() : null)
        }
        
    }

    function successfulPost(){
        document.getElementById("contact-form").reset()
        setOpenSnack(true)
    }

    return(
        <section className="contact-page">
            <div className="contact">
                <h1>Contact</h1>
                <p>Vous souhaitez être informé.e de mes prochaines expositions, me contacter ou me faire part de vos impressions ?</p>
                <p>N'hésitez pas à utiliser ce formulaire, je vous répondrai avec plaisir.</p>
            </div>
            <form id="contact-form" onSubmit={submit} noValidate autoComplete="off">
                <TextField 
                    className="input"
                    required
                    id="standard-required"
                    label="Nom"
                    margin="normal"
                    name="name"
                    error={errorName}
                    fullWidth
                />
                <TextField 
                    className="input"
                    required
                    id="standard-required"
                    label="E-mail"
                    margin="normal"
                    name="email"
                    error={errorMail}
                    fullWidth
                />
                <TextField 
                    className="input"
                    id="standard-required"
                    label="Sujet"
                    margin="normal"
                    name="subject"
                    fullWidth
                />
                <TextField 
                    className="input"
                    required
                    id="standard-required"
                    label="Message"
                    margin="normal"
                    multiline={true}
                    name="message"
                    error={errorMessage}
                    fullWidth
                />
                {errorName || errorMail || errorMessage ? <p className="error">Certains champs sont requis. Merci de les remplir correctement</p> : <span></span>}
                <div className="send">
                    <Button className="save" type="submit" variant="contained" color="primary">
                        Envoyer
                        <Icon className="icon">send</Icon>
                    </Button>
                </div>
            </form>
            <CustomSnackbar handleOpen={openSnack} text="Message envoyé avec succès" />
        </section>
    )
}

export default Contact; 