import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import '../Admin.css'
import configURL from '../../../helper/constant'

import CustomSelect from '../../common/CustomSelect'
import FileUploader from '../../common/FileUploader'
import CustomSnackbar from '../../common/CustomSnackbar'

function ArticleCreate(props){
    const TYPE_OF_ARTICLE = [{id: 1, name: 'Exposition'}, {id: 2, name: 'Article'}]

    const [newBlob, setNewBlob] = useState(null)
    const [openSnack, setOpenSnack] = useState(false)
    const [isReinit, setIsReinit] = useState(false)
    const [type, setType] = useState('')

    function getUploadedImg(img) {
        setNewBlob(img)
    }

    const handleSubmitCreate = async (event) => {
        setOpenSnack(false)
        event.preventDefault()
        const data = new FormData(event.target)
        
        const body = JSON.stringify({
            name: data.get('title'),
            detail: data.get('detail'),
            type,
            pic: newBlob,
        })
        const headers = {
            'content-type': 'application/json',
            accept: 'application/json',
        };
        await fetch(`${configURL}/article`, {
            method: 'POST',
            headers,
            body,
        })
        .then(response => response.status === 201 ? successfulPost() : null)
    }

    function successfulPost(){
        setOpenSnack(true)
        props.changeInArticles()
        document.getElementById("article-form-create").reset()
        setNewBlob(null)
    }

    function handleChangeSelect(type) {
        setIsReinit(false)
        const typeName = TYPE_OF_ARTICLE.filter(elt => elt.id === type)[0]
        setType(typeName ? typeName.name : '')
    }

    return (
        <div className="create">
            <p><strong>Créer</strong> un nouvel article</p>
            <form id="article-form-create" onSubmit={handleSubmitCreate} noValidate autoComplete="off">
                <CustomSelect reinit={isReinit} list={TYPE_OF_ARTICLE} title="Type" handleChange={handleChangeSelect}/>
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
            <CustomSnackbar handleOpen={openSnack} text="Article sauvegardé en base de données" />
        </div>
    )
}

export default ArticleCreate