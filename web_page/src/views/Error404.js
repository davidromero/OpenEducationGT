import React from "react";
import {Paper} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import "./styles/PagesStyle.css";

const Error404 = () => {
    let history = useHistory();

    const returnHome = () =>{
        history.push('/')
    };

    return(
        <div className={"page-container"}>
            <Paper className={"simple-paper"} elevation={2} square={false}>
                <h1>404</h1><br/>
                <h2>Pagina No Encontrada</h2><br/>
                <button className={'mid-paper-button'} 
                style={{margin: "4px"}} onClick={() => { returnHome(); }}>Regresar</button>
            </Paper>
        </div>
    )
};

export {Error404}