import React, {useState} from "react";
import placeholder from "../assets/img/profile_placeholder.png";
import axios from "axios";
import {Paper} from "@material-ui/core";
import "./styles/PagesStyle.css";

const Dashboard = (props) => {
    const [image, setImage] = useState();
    const {document} = 123456;

    const handleImage = e => {
        if (e.target.files[0] !== undefined){
            console.log(e.target.files[0]);
          setImage(URL.createObjectURL(e.target.files[0]));
          axios.put('https://kxevtgrjyb.execute-api.us-east-1.amazonaws.com/api/upload/' + document,
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
        <label htmlFor="upload-button">
            <img style={{objectFit: "cover", width: "200px", height: "280px"}}
                 src={image ? image : "https://s3.amazonaws.com/pixsell.opendatagt.documentstorage/" + document} alt={"profile"}
                 onError={() => {setImage(placeholder);}}/>
            <input type="file" id="upload-button" onChange={handleImage}
                   style={{display: "none"}}/>
        </label>
        <div style={{width: "200px"}}>
            <ProcessDocumentButton/>
        </div>
      </Paper>
    </div>
  );
};

const ProcessDocumentButton = (props) => {
    return (
        <button className="mid-paper-button" onClick={processDocument}>Procesar Documento</button>
    );
  };

const processDocument = () => {
    axios.get("https://kxevtgrjyb.execute-api.us-east-1.amazonaws.com/api/textract")
    .then((res) => {
        console.log(res);
    })
      .catch((error) => {
    });
};  


export {Dashboard};