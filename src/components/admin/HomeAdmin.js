import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import './HomeAdmin.css'
import configURL from '../../helper/constant'

import FileUploader from '../common/FileUploader'
import CustomSnackbar from '../common/CustomSnackbar'

function HomeAdmin() {
    const [homePageData, setHomePageData] = useState({})
    const [blob1, setBlob1] = useState(null)
    const [blob2, setBlob2] = useState(null)
    const [blob3, setBlob3] = useState(null)
    const [openSnack, setOpenSnack] = useState(false)


    useEffect(()=>{
        getHomePageData()
    }, [])

    async function getHomePageData() {
        await fetch(`${configURL}/home-data`)
        .then(response => response.json())
        .then(result => {
            const imageStr1 = result[0].pic1.data ? Buffer.from(result[0].pic1.data).toString('base64') : null;
            const imageStr2 = result[0].pic2.data ? Buffer.from(result[0].pic2.data).toString('base64') : null;
            const imageStr3 = result[0].pic3.data ? Buffer.from(result[0].pic3.data).toString('base64') : null;
            result[0].pic1 = "data:image/jpeg;base64,"+imageStr1
            result[0].pic2 = "data:image/jpeg;base64,"+imageStr2
            result[0].pic3 = "data:image/jpeg;base64,"+imageStr3
            return setHomePageData(result[0])
        })
    }

    const handleSubmit = async(event)=>{
        setOpenSnack(false);
        event.preventDefault()
        const data = new FormData(event.target)

        const body = JSON.stringify({
            id: homePageData.id,
            title: data.get('title'),
            title_bloc1: data.get('title-bloc1'),
            title_bloc2: data.get('title-bloc2'),
            title_bloc3: data.get('title-bloc3'),
            bloc1: data.get('bloc1'),
            bloc2: data.get('bloc2'),
            bloc3: data.get('bloc3'),
            pic1: blob1,
            pic2: blob2,
            pic3: blob3,
        })

        const headers = {
            'content-type': 'application/json',
            accept: 'application/json',
        }
        await fetch(`${configURL}/home-data/`+homePageData.id, {
            method: 'PUT',
            headers,
            body,
        })
        .then(response => (response.status === 200 || response.status === 204) ? setOpenSnack(true) : null)
    }

    function getUploadedImg1(img){
        setBlob1(img)
    }

    function getUploadedImg2(img){
        setBlob2(img)
    }

    function getUploadedImg3(img){
        setBlob3(img)
    }

    return (
        <div className="home-admin">
            <div className="home-admin-title">
                <h4>Editer la page d'accueil</h4>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <div className="home-admin-form" key={homePageData ? homePageData.id : ''}>
                    <TextField
                        className="input-home-admin"
                        required
                        id="standard-required"
                        label="Titre de la page"
                        defaultValue={homePageData ? homePageData.title : ''}
                        margin="normal"
                        name="title"
                        fullWidth
                    />
                    <div>
                        <TextField 
                            className="input-home-admin"
                            id="standard-required"
                            label="Titre du premier bloc"
                            defaultValue={homePageData ? homePageData.title_bloc1 : ''}
                            margin="normal"
                            multiline={true}
                            name="title-bloc1"
                            fullWidth
                        />
                        <TextField 
                            className="input-home-admin"
                            id="standard-required"
                            label="Contenu de premier bloc"
                            defaultValue={homePageData ? homePageData.bloc1 : ''}
                            margin="normal"
                            multiline={true}
                            name="bloc1"
                            fullWidth
                        />
                        <FileUploader parentGiveImg={(homePageData && homePageData.pic1) ? homePageData.pic1 : null} parentGetImg={getUploadedImg1}/>
                    </div>
                    <div>
                        <TextField 
                            className="input-home-admin"
                            id="standard-required"
                            label="Titre du second bloc"
                            defaultValue={homePageData ? homePageData.title_bloc2 : ''}
                            margin="normal"
                            multiline={true}
                            name="title-bloc2"
                            fullWidth
                        />
                        <TextField 
                            className="input-home-admin"
                            id="standard-required"
                            label="Contenu de second bloc"
                            defaultValue={homePageData ? homePageData.bloc2 : ''}
                            margin="normal"
                            multiline={true}
                            name="bloc2"
                            fullWidth
                        />
                        <FileUploader parentGiveImg={(homePageData && homePageData.pic2) ? homePageData.pic2 : null} parentGetImg={getUploadedImg2}/>
                    </div>
                    <div>
                        <TextField 
                            className="input-home-admin"
                            id="standard-required"
                            label="Titre du troisème bloc"
                            defaultValue={homePageData ? homePageData.title_bloc3 : ''}
                            margin="normal"
                            multiline={true}
                            name="title-bloc3"
                            fullWidth
                        />
                        <TextField 
                            className="input-home-admin"
                            id="standard-required"
                            label="Contenu de troisième bloc"
                            defaultValue={homePageData ? homePageData.bloc3 : ''}
                            margin="normal"
                            multiline={true}
                            name="bloc3"
                            fullWidth
                        />
                        <FileUploader parentGiveImg={(homePageData && homePageData.pic3) ? homePageData.pic3 : null} parentGetImg={getUploadedImg3}/>
                    </div>
                    
                </div>
                
                <div className="send">
                    <Button className="save" type="submit" variant="contained" color="default">
                        Sauvegarder
                        <Icon className="icon">send</Icon>
                    </Button>
                </div>
            </form>
            <CustomSnackbar handleOpen={openSnack} text="Données de la page d'accueil sauvegardées en base de données" />
        </div>
    )
}

export default HomeAdmin