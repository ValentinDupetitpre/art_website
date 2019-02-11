import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'
import '../Admin.css'
import './Painting.css'

import CustomSelect from '../../common/CustomSelect'
import FileUploader from '../../common/FileUploader'

function PaintingEdit() {
    const [tableaux, setTableaux] = useState([''])
    const [collectionNames, setCollectionNames] = useState([])
    const [newBlob, setNewBlob] = useState(null)
    const [selected, setSelected] = useState({})
    const [isReinit, setIsReinit] = useState(false)
    const [collecId, setCollecId] = useState(null)

    useEffect(()=>{
        getTableaux()
        getCollectionName()
    }, [])

    const getCollectionName = async ()=>{
        const response = []
        await fetch('http://localhost:5000/collection/title')
        .then(response => response.json())
        .then(result => result.map(collec => response.push(collec)))
        setCollectionNames(response)
    }

    const getTableaux = async ()=>{
        const response = []
        await fetch('http://localhost:5000/painting')
        .then(response => response.json())
        .then(result => result.map(painting => {
            var imageStr = arrayBufferToBase64(painting.pic.data);
            painting.pic = imageStr
            return response.push(painting)
        }))
        setTableaux(response)
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
        event.preventDefault()
        const data = new FormData(event.target)

        const body = JSON.stringify({
            id: selected.id,
            name: data.get('title'),
            detail: data.get('detail'),
            pic: newBlob,
            collectionId: collecId,
        })

        const headers = {
            'content-type': 'application/json',
            accept: 'application/json',
        }
        await fetch('http://localhost:5000/painting/'+selected.id, {
            method: 'PUT',
            headers,
            body,
        })

        handleReinit()
    }

    const handleDelete = async () => {
        if(selected){
            const id = selected.id
            await fetch('http://localhost:5000/painting/'+id, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',
                },
            });
            handleReinit()
        }else{
            console.log('erreur, pas de tableau à supprimer')
        }

    }

    function handleReinit(){
        setIsReinit(true)
        setNewBlob(null)
        setSelected({})
        setCollecId(null)
        setTableaux([''])
        getCollectionName()
        getTableaux()
    }

    function handleChangeSelectTab(tableauId) {
        setIsReinit(false)
        const tab = tableaux.find(tableau => tableau.id === tableauId)
        setSelected(tab)
        tab ? setCollecId(tab.collectionId) : setCollecId(null)
    }

    function handleChangeSelectCollec(collectionId) {
        setIsReinit(false)
        setCollecId(collectionId)
    }

    return (
        <div className="edit">
            <div className="edit-row">
                <p className="selectCollec"><strong>Editer</strong> un tableau existant</p>
                <CustomSelect reinit={isReinit} list={tableaux} title="Tableaux" handleChange={handleChangeSelectTab}/>
            </div>
            <CustomSelect init={collecId ? collecId : ''} reinit={isReinit} list={collectionNames} title="Collection du tableau *" handleChange={handleChangeSelectCollec}/>
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

export default PaintingEdit