import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'
import './Collection.css'

import CustomSelect from '../common/CustomSelect'
import FileUploader from '../common/FileUploader'

function Collection() {
    const [collections, setCollections] = useState([''])
    const [newBlob, setNewBlob] = useState(null)
    const [selected, setSelected] = useState({})

    useEffect(()=>{
        const response = []
        fetch('http://localhost:5000/collection')
            .then(response => response.json())
            .then(result => result.map(collec => {
                if(collec.pic){
                    var imageStr = arrayBufferToBase64(collec.pic.data);
                    collec.pic = imageStr
                }
                return response.push(collec)
            }))
        setCollections(response)
        
    }, [])

    function arrayBufferToBase64(buffer) {
        var binary = ''
        var bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b) => binary += String.fromCharCode(b))
        return binary;
    };

    function getUploadedImg(img) {
        setNewBlob(img)
    }

    const handleSubmitCreate = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        
        const body = JSON.stringify({
            name: data.get('title'),
            detail: data.get('detail'),
            pic: newBlob,
        });
        const headers = {
            'content-type': 'application/json',
            accept: 'application/json',
        };
        await fetch('http://localhost:5000/collection', {
            method: 'POST',
            headers,
            body,
        });
    }

    const handleEdit = (event)=>{
        event.preventDefault();
        const data = new FormData(event.target);

        const body = JSON.stringify({
            name: data.get('title'),
            detail: data.get('detail'),
            pic: newBlob,
        });

        console.log(body)
    }

    const handleDelete = () => {

    }

    function handleChangeSelect(collecId) {
        setSelected(collections.find(collec => collec.id === collecId))
    }

    return (
        <div className="collec">
            <div className="collec-create">
                <p><strong>Créer</strong> une nouvelle collection</p>
                <form onSubmit={handleSubmitCreate} noValidate autoComplete="off">
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
                    {/* <Input 
                        className="input img"
                        type="file" 
                        accept=".dwg, .gif, .jpg, .png, .csv"
                        onChange={handleImg} 
                    /> */}
                    <FileUploader parentGetImg={getUploadedImg}/>

                    <Button className="send" type="submit" variant="contained" color="default" >
                        Envoyer 
                        <Icon className="icon">send</Icon>
                    </Button>
                </form>
            </div>
            <div className="collec-edit">
                <div className="edit-row">
                    <p><strong>Editer</strong> une collection existante</p>
                    <CustomSelect list={collections} title="Collections" handleChange={handleChangeSelect}/>
                </div>
                <form noValidate autoComplete="off" key={selected ? selected.id : ''}>
                    <TextField 
                        className="input"
                        required
                        id="standard-required"
                        label="Titre"
                        defaultValue={selected ? selected.name : ''}
                        margin="normal"
                        name="title"
                        fullWidth
                    />
                    <TextField 
                        className="input"
                        id="standard-required"
                        label="Détail"
                        defaultValue={selected ? selected.detail : ''}
                        margin="normal"
                        multiline={true}
                        name="detail"
                        fullWidth
                    />
                    <FileUploader parentGiveImg={(selected && selected.pic) ? selected.pic : null} parentGetImg={getUploadedImg}/>
                    <div className="send">
                        <Button className="delete" type="submit" variant="contained" color="secondary" onClick={handleDelete}>
                            Supprimer
                            <DeleteIcon className="icon" />
                        </Button>
                        <Button className="save" variant="contained" color="default" onClick={handleEdit} >
                            Sauvegarder 
                            <Icon className="icon">send</Icon>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Collection