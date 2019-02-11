import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'
import './Collection.css'

import CustomSelect from '../../common/CustomSelect'
import FileUploader from '../../common/FileUploader'

function CollectionEdit() {
    const [collections, setCollections] = useState([''])
    const [newBlob, setNewBlob] = useState(null)
    const [selected, setSelected] = useState({})
    const [isReinit, setIsReinit] = useState(false)

    useEffect(()=>{
        getCollection()
    }, [])

    const getCollection = async ()=>{
        const response = []
        await fetch('http://localhost:5000/collection')
        .then(response => response.json())
        .then(result => result.map(collec => {
            if(collec.pic){
                var imageStr = arrayBufferToBase64(collec.pic.data);
                collec.pic = imageStr
            }
            return response.push(collec)
        }))
        setCollections(response)
    }

    function arrayBufferToBase64(buffer) {
        var binary = ''
        var bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b) => binary += String.fromCharCode(b))
        return binary;
    };

    function getUploadedImg(img) {
        setNewBlob(img)
    }

    const handleEdit = async(event)=>{
        event.preventDefault();
        const data = new FormData(event.target);

        const body = JSON.stringify({
            id: selected.id,
            name: data.get('title'),
            detail: data.get('detail'),
            pic: newBlob,
        });

        const headers = {
            'content-type': 'application/json',
            accept: 'application/json',
        };
        await fetch('http://localhost:5000/collection/'+selected.id, {
            method: 'PUT',
            headers,
            body,
        });

        handleReinit()
    }

    const handleDelete = async () => {
        if(selected){
            const id = selected.id
            await fetch('http://localhost:5000/collection/'+id, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',
                },
            });
            handleReinit()
        }else{
            console.log('erreur, pas de collection à supprimer')
        }

    }

    function handleReinit(){
        setIsReinit(true)
        setNewBlob(null)
        setSelected({})
        setCollections([])
        getCollection()
    }

    function handleChangeSelect(collecId) {
        setIsReinit(false)
        setSelected(collections.find(collec => collec.id === collecId))
    }

    return (
        <div className="collec-edit">
            <div className="edit-row">
                <p><strong>Editer</strong> une collection existante</p>
                <CustomSelect reinit={isReinit} list={collections} title="Collections" handleChange={handleChangeSelect}/>
            </div>
            <form onSubmit={handleEdit} noValidate autoComplete="off" key={selected ? selected.id : ''}>
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
                    <Button className="reinit" variant="contained" color="primary" onClick={handleReinit} >
                        Réinit.
                        <Icon className="icon">autorenew</Icon>
                    </Button>
                    <Button className="save" type="submit" variant="contained" color="default">
                        Sauver
                        <Icon className="icon">send</Icon>
                    </Button>
                    <Button className="delete" variant="contained" color="secondary" onClick={handleDelete}>
                        Supprimer
                        <DeleteIcon className="icon" />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CollectionEdit