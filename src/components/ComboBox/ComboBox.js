import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from "@material-ui/core/styles";
import "./comboBox.scss";


export default function ComboBox(props) {

    const useStyles = makeStyles({
        paper: {
            fontFamily: "Oswald, sans-serif",
            fontSize: "24px",
            fontWeight: "400"
        }
    });

    const classes = useStyles();

    return (
        <div className='bottom-container center-container'>
            <Autocomplete
                inputValue={props.inputValue}
                onInputChange={props.onChange}
                classes={{ paper: classes.paper }}
                id="controllable-states"
                options={props.capitals}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Seleccione otra ciudad" />}
            />
        </div>
    );
}

