import React, {useState, useEffect} from "react";
import placeholder from "../assets/img/profile_placeholder.png";
import axios from "axios";
import {Paper} from "@material-ui/core";
import "./styles/PagesStyle.css";
import {documentModel} from "../models/document"

const Dashboard = (props) => {
    const [image, setImage] = useState();
    const [document, setDocument] = useState();
    const [extractedText, setExtractedText] = useState("");

    const handleImage = e => {
        if (e.target.files[0] !== undefined){
            setDocument(e.target.files[0]['name']);
            setImage(URL.createObjectURL(e.target.files[0]));
            axios.put('https://kxevtgrjyb.execute-api.us-east-1.amazonaws.com/api/upload/' + e.target.files[0]['name'],
                e.target.files[0], {headers: {'Content-Type': 'image/jpeg'}})
                .then((response) => {
                })
                .catch((error) => {

                });
        }
    };  


  return (
    <div className={"page-container"}>
      <Paper className={"simple-paper"} elevation={2} square={false}>
        <p>Nombre del Archivo: {document}</p>
        <label htmlFor="upload-button">
            <img style={{objectFit: "cover", width: "200px", height: "280px"}}
                 src={image ? image : "https://s3.amazonaws.com/pixsell.opendatagt.documentstorage/" + document} alt={"profile"}
                 onError={() => {setImage(placeholder);}}/>
            <input type="file" id="upload-button" onChange={handleImage}
                   style={{display: "none"}}/>
        </label>
        <div style={{width: "200px"}}>
            {document ? <ProcessDocumentButton document={document}/> : <div></div>}
        </div>
      </Paper>
    </div>
  );
};

const ProcessDocumentButton = (props) => {
    const {document} = props;

    const processDocument = () => {
        axios.post("https://kxevtgrjyb.execute-api.us-east-1.amazonaws.com/api/textract",
        documentModel(document), {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log(res);
        })
          .catch((error) => {
              console.log(error);
        });
    }; 

    return (
        <button className="mid-paper-button" onClick={processDocument}>Procesar Documento</button>
    );
  }; 


export {Dashboard};