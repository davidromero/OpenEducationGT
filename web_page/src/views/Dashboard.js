import React, {useState, useEffect} from "react";
import placeholder from "../assets/img/profile_placeholder.png";
import axios from "axios";
import {Paper, TextField} from "@material-ui/core";
import "./styles/PagesStyle.css";
import {documentModel} from "../models/document";

const Dashboard = (props) => {
    const [image, setImage] = useState();
    const [document, setDocument] = useState();
    const [extractedText, setExtractedText] = useState("");
    const [extractingData, setExtractingData] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

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

    useEffect(() => {
        setExtractedText(null);
        setExtractingData(false);
      }, [document]);
    
    const handleChange = (e) => {
        setPhoneNumber(e.target.value);
    };    


  return (
    <div className={"page-container"}>
      <Paper className={"simple-paper"} elevation={15} square={false}>
        <p><b>Nombre del Archivo:</b> {document}</p>
        <p><i>Presione la imagen para subir una foto del Documento</i></p>
        <label htmlFor="upload-button">
            <img style={{objectFit: "cover", width: "250px", height: "320px"}}
                 src={image ? image : "https://s3.amazonaws.com/pixsell.opendatagt.documentstorage/" + document} alt={"profile"}
                 onError={() => {setImage(placeholder);}}/>
            <input type="file" id="upload-button" onChange={handleImage}
                   style={{display: "none"}}/>
        </label>
        {document ? <ProcessDocumentButton document={document} setExtractedText={setExtractedText} setExtractingData={setExtractingData}/> : <div></div>}
        <p><b>Texto Analizado: </b></p> {extractedText ? extractedText : extractingData ? <p>Cargando ...</p> : <div></div>}
        {document && extractedText ? <TextField style={{margin: "8px", width: "180px"}} name="phone"
                   label="Numero de Telefono" onChange={handleChange} value={phoneNumber || ""}/> : <div></div>}
        {document && extractedText ? <button className="mid-paper-button">Enviar Texto (SMS)</button> : <div></div>}
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
              alert(error);
              console.log("Imagen No puede ser analizada, las letras deben estar claras");
              setExtractingData(false);
        });
    }; 

    return (
        <button className="mid-paper-button" onClick={processDocument}>Procesar Documento</button>
    );
  }; 


export {Dashboard};