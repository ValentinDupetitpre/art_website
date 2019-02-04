import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';


function CustomSelect(props) {

  // props.title = collections
  // props.handleChange = title = value (prend la value et la mets dans le title)
  // props.
    
    return (
        <FormControl variant="outlined">
          {/* <InputLabel
            htmlFor="outlined-age-simple"
          >
            Age
          </InputLabel>
          <Select
            value={props.title}
            onChange={props.handleChange}
            input={
              <OutlinedInput
                labelWidth={0}
                name="age"
                id="outlined-age-simple"
              />
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select> */}
        </FormControl>
    )
}

export default CustomSelect