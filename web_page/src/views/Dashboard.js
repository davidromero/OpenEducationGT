import React, {useState} from "react";
import placeholder from "../assets/img/profile_placeholder.png";
import axios from "axios";
import {Paper} from "@material-ui/core";
import "./styles/PagesStyle.css";
import {documentModel} from "../models/document"

const Dashboard = (props) => {
    const [image, setImage] = useState();
    const [document, setDocument] = useState();
    const [extractedText, setExtractedText] = useState("");
    const [extractingData, setExtractingData] = useState(false);

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
            {document ? <ProcessDocumentButton document={document} setExtractedText={setExtractedText} setExtractingData={setExtractingData}/> : <div></div>}
        </div>
        <p>Texto Analizado: </p> {extractedText ? extractedText : extractingData ? <p>Cargando ...</p> : <div></div>}

        <button className="mid-paper-button">Enviar Texto (SMS)</button>
      </Paper>
    </div>
  );
};

const ProcessDocumentButton = (props) => {
    const {document} = props;
    const {setExtractedText} = props;
    const {setExtractingData} = props;

    const processDocument = () => {
        setExtractingData(true);
        axios.post("https://kxevtgrjyb.execute-api.us-east-1.amazonaws.com/api/textract",
        documentModel(document), {headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            setExtractedText(res.data.payload);
            console.log(res.data.payload);
            setExtractingData(false);
        })
          .catch((error) => {
              console.log(error);
              setExtractingData(false);
        });
    }; 

    return (
        <button className="mid-paper-button" onClick={processDocument}>Procesar Documento</button>
    );
  }; 


export {Dashboard};