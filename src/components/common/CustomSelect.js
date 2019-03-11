import React, {useState, useEffect} from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import './CustomSelect.css'

function CustomSelect(props) {
    const[listName, setListName] = useState("")

    function handleChange(event) {
        const newVal = event.target.value;
        setListName(newVal);
        props.handleChange(newVal);
    };
    
    useEffect(()=>{
        props.init ? setListName(props.init) : setListName("")
    }, [props.init])

    useEffect(()=>{
        if(props.list && props.list.length > 0){
            selectList()
        }
    },[props.list])

    useEffect(()=>{
        return props.reinit ? setListName("") : undefined
    }, [props.reinit])

    function selectList(){
        const items = props.list.map((unit, i) => 
            <MenuItem key={i} value={unit.id}>{unit.name}</MenuItem>
        )
        return items;
    }

    return (
        <form autoComplete="off">
            <FormControl variant="outlined" className="formControl">
                <InputLabel htmlFor="outlined-select-simple">{props.title}</InputLabel>
                <Select
                    value={listName}
                    onChange={handleChange}
                    input={
                        <OutlinedInput
                        labelWidth={0}
                        name="select"
                        id="outlined-select-simple"
                        />
                    }
                    >
                    <MenuItem value="">
                        <em>Aucune</em>
                    </MenuItem>
                    {selectList()}
                </Select>
            </FormControl>
        </form>
    );
  
}

export default CustomSelect;
