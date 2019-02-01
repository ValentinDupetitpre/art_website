import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

function Admin(props)  { 
    // const [name, setName] = useState('')
    const [blob, setBlob] = useState(null)

    var currentLocation = props.location.pathname
    console.log(currentLocation)

    useEffect(()=>{
        fetch('http://localhost:5000/gallery')
            .then(response => response.json())
            .then(result => console.log(result))
    }, [])


    function showTableau() {
        if(blob && blob.length>0){
            return (
                <div>
                    <img alt="" src={blob}/>
                </div>
            )
        }else{
            return (<div></div>)
        }
    }

    function handleImg(event){
        const file = event.target.files[0]

        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setBlob(e.target.result)
        }
    }

    function handleChange(event) {
        console.log(event.target.value)
    }

    return(
        <div className="admin">
        <h1>Admin page</h1>
            <h3>Tableaux</h3>
            <form>
                <h3>Nouveau tableau</h3>
                <TextField
                    required
                    id="standard-required"
                    label="Nom du tableau"
                    defaultValue="Nom du tableau"
                    margin="normal"
                    name="title"
                />
                <br/>
                <TextField
                    required
                    id="standard-required"
                    label="Description du tableau"
                    defaultValue="Description du tableau"
                    margin="normal"
                    name="description"
                />
                <br/>
                <FormControl variant="outlined" required >
                    <InputLabel
                        
                        htmlFor="outlined-age-simple"
                    >
                        Collection du tableau
                    </InputLabel>
                    <Select
                        value={0}
                        onChange={handleChange}
                        input={
                        <OutlinedInput
                            labelWidth={50}
                            name="age"
                            id="outlined-age-simple"
                        />
                        }
                    >
                        <MenuItem value={0}>
                        <em>Aucune</em>
                        </MenuItem>
                        <MenuItem value={1}>collec 1</MenuItem>
                        <MenuItem value={2}>collec 3</MenuItem>
                        <MenuItem value={3}>collec 3</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <input id="uploadFiles" accept=".dwg, .gif, .jpg, .png, .csv"
                    type="file" name="uploadFiles" onChange={handleImg} />
                <br/>
                <input type="submit" value="Submit" />
            </form>
            {showTableau()}
        </div>
    )
}

export default Admin;