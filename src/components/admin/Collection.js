import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './Collection.css'

import FileUploader from '../common/FileUploader'

function Collection() {
    const [collections, setCollections] = useState([''])
    const [newBlob, setNewBlob] = useState(null)

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
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return binary;
    };

    function getUploadedImg(img) {
        setNewBlob(img)
        console.log(img)
    }

    const handleSubmit = async (event) => {
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
    
    return (
        <div className="collec">
            <p>Créer une nouvelle collection</p>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
                <FileUploader getImg={getUploadedImg}/>

                <Button className="send" type="submit" variant="contained" color="default" >
                    Envoyer 
                    <Icon className="icon">send</Icon>
                </Button>
            </form>
        </div>
    )
}

export default Collection