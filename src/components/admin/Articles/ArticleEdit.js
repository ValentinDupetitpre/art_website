import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'
import '../Admin.css'
import './Article.css'
import configURL from '../../../helper/constant'

import CustomSelect from '../../common/CustomSelect'
import FileUploader from '../../common/FileUploader'
import CustomSnackbar from '../../common/CustomSnackbar'

function ArticleEdit(props) {
    const TYPE_OF_ARTICLE = [{id: 1, name: 'Exposition'}, {id: 2, name: 'Article'}]

    const [articles, setArticles] = useState([''])
    const [type, setType] = useState('')
    const [newBlob, setNewBlob] = useState(null)
    const [selected, setSelected] = useState({})
    const [isReinit, setIsReinit] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [snackText, setSnackText] = useState("Article sauvegardé en base de données")
    const snackEdit = "Article sauvegardé en base de données"
    const snackDelete = "Article supprimé de la base de données"

    useEffect(()=>{
        setArticles(props.articleNames)
    },[props.articleNames])

    const getArticle = async (id)=>{
        await fetch(`${configURL}/article/`+id)
        .then(response => response.json())
        .then(result => {
            if(result.pic){
                const imageStr = Buffer.from(result.pic.data).toString('base64');
                result.pic = "data:image/jpeg;base64,"+imageStr
            }
            return setSelected(result)
        })
    }

    function getUploadedImg(img) {
        setNewBlob(img)
    }

    const handleEdit = async(event)=>{
        setOpenSnack(false)
        event.preventDefault();
        const data = new FormData(event.target);

        const body = JSON.stringify({
            id: selected.id,
            name: data.get('title'),
            detail: data.get('detail'),
            type: type ? type : selected.type,
            pic: newBlob,
        });

        const headers = {
            'content-type': 'application/json',
            accept: 'application/json',
        };
        await fetch(`${configURL}/article/`+selected.id, {
            method: 'PUT',
            headers,
            body,
        });
        setSnackText(snackEdit)
        handleReinit()
        setOpenSnack(true)
    }

    const handleDelete = async () => {
        setOpenSnack(false)
        if(selected){
            const id = selected.id
            await fetch(`${configURL}/article/`+id, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',
                },
            });
            setSnackText(snackDelete)
            handleReinit()
            setOpenSnack(true)
        }else{
            console.log('erreur, pas d\'article à supprimer')
        }
    }

    function handleReinit(){
        props.changeInArticles()
        setIsReinit(true)
        setNewBlob(null)
        setSelected({})
        setArticles(props.articleNames)
    }

    function handleChangeArticleSelect(articleId) {
        setIsReinit(false)
        getArticle(articleId)
    }

    function handleChangeTypeSelect(type){
        setIsReinit(false)
        const typeName = TYPE_OF_ARTICLE.filter(elt => elt.id === type)[0]
        setType(typeName ? typeName.name : '')
    }

    function initSelect(){
        if(selected.type){
            const selectedType = TYPE_OF_ARTICLE.find(elt => elt.name === selected.type)
            return selectedType.id
        }
        return ''
    }

    return (
        <div className="edit">
            <div className="edit-row">
                <p className="select-article"><strong>Editer</strong> un article existant</p>
                <CustomSelect reinit={isReinit} list={articles} title="Articles" handleChange={handleChangeArticleSelect}/>
            </div>
            <form onSubmit={handleEdit} noValidate autoComplete="off" key={selected ? selected.id : ''}>
                <CustomSelect init={initSelect} reinit={isReinit} list={TYPE_OF_ARTICLE} title="Type" handleChange={handleChangeTypeSelect}/>
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
            <CustomSnackbar handleOpen={openSnack} text={snackText} />
        </div>
    )
}

export default ArticleEdit