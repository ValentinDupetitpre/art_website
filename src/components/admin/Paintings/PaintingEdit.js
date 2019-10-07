import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'
import '../Admin.css'
import './Painting.css'
import configURL from '../../../helper/constant'

import CustomSelect from '../../common/CustomSelect'
import FileUploader from '../../common/FileUploader'

function PaintingEdit(props) {
    const [tableauxName, setTableauxName] = useState([''])
    const [collectionNames, setCollectionNames] = useState([])
    const [newBlob, setNewBlob] = useState(null)
    const [selected, setSelected] = useState({})
    const [isReinit, setIsReinit] = useState(false)
    const [collecId, setCollecId] = useState(null)

    useEffect(()=>{
        getTableauxName()
        getCollectionName()
    }, [props])

    function getCollectionName() {
        setCollectionNames(props.collectionNames)
    }

    const getTableauxName = async ()=>{
        const response = []
        await fetch(`${configURL}/painting/title`)
        .then(response => response.json())
        .then(result => result.map(painting => { return response.push(painting)}))
        setTableauxName(response)
    }

    const getTableau = async (id)=>{
        await fetch(`${configURL}/painting/`+id)
        .then(response => response.json())
        .then(result => {
            const imageStr = result.pic.data ? Buffer.from(result.pic.data).toString('base64') : null;
            
            result.pic = "data:image/jpeg;base64,"+imageStr
            return assignPainting(result)
        })
    }

    function assignPainting(painting){
        setSelected(painting)
        painting ? setCollecId(painting.collectionId) : setCollecId(null)
    }

    // function arrayBufferToBase64(buffer) {
    //     var binary = ''
    //     var bytes = [].slice.call(new Uint8Array(buffer))
    //     bytes.forEach((b) => binary += String.fromCharCode(b))
    //     return binary;
    // };

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
        await fetch(`${configURL}/painting/`+selected.id, {
            method: 'PUT',
            headers,
            body,
        })

        handleReinit()
    }

    const handleDelete = async () => {
        if(selected){
            const id = selected.id
            await fetch(`${configURL}/painting/`+id, {
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
        setTableauxName([''])
        getCollectionName()
        getTableauxName()
    }

    function handleChangeSelectTab(tableauId) {
        setIsReinit(false)
        getTableau(tableauId)
    }

    function handleChangeSelectCollec(collectionId) {
        setIsReinit(false)
        setCollecId(collectionId)
    }

    return (
        <div className="edit">
            <div className="edit-row">
                <p className="selectCollec"><strong>Editer</strong> un tableau existant</p>
                <CustomSelect reinit={isReinit} list={tableauxName} title="Tableaux" handleChange={handleChangeSelectTab}/>
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