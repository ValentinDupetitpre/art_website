import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import '../Admin.css'

import FileUploader from '../../common/FileUploader'
import CustomSnackbar from '../../common/CustomSnackbar'

function CollectionCreate() {
    const [newBlob, setNewBlob] = useState(null)
    const [openSnack, setOpenSnack] = useState(false)

    function getUploadedImg(img) {
        setNewBlob(img)
    }

    const handleSubmitCreate = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        
        const body = JSON.stringify({
            name: data.get('title'),
            detail: data.get('detail'),
            pic: newBlob,
        })
        const headers = {
            'content-type': 'application/json',
            accept: 'application/json',
        };
        await fetch('http://localhost:5000/collection', {
            method: 'POST',
            headers,
            body,
        })
        .then(response => response.status === 201 ? successfulPost() : null)
    }

    function successfulPost(){
        setOpenSnack(true)
        document.getElementById("collection-form-create").reset()
        setNewBlob(null)
    }

    return (
        <div className="create">
            <p><strong>Créer</strong> une nouvelle collection</p>
            <form id="collection-form-create" onSubmit={handleSubmitCreate} noValidate autoComplete="off">
                <TextField 
                    className="input"
                    required
                    id="standard-required"
                    label="Titre"
                    defaultValue=""
                    margin="normal"
                    name="title"
                    fullWidth
                />
                <TextField 
                    className="input"
                    id="standard-required"
                    label="Détail"
                    defaultValue=""
                    margin="normal"
                    multiline={true}
                    name="detail"
                    fullWidth
                />
                <FileUploader parentGiveImg={newBlob} parentGetImg={getUploadedImg}/>

                <Button className="send" type="submit" variant="contained" color="default" >
                    Envoyer 
                    <Icon className="icon">send</Icon>
                </Button>
            </form>
            <CustomSnackbar handleOpen={openSnack} text="Collection sauvegardée en base de données" />
        </div>
    )
}

export default CollectionCreate