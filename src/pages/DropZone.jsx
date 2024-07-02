import React, { useState } from "react";
// import useSWRMutation from 'swr/mutation';
// import Error from '../Error';
import { FileUploader } from "react-drag-drop-files";
import { useOutletContext } from "react-router-dom";
import { save } from "../api";
// const FormData = require('form-data');
// import { FormData } from 'form-data'

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({}) {
  const [file, setFile] = useState(null);
  const [ contextID ] = useOutletContext();

  // const {
  //   trigger: saveFoto,
  //   error: saveError,
  // } = useSWRMutation('transactions', save);

  const handleChange = (file) => {
    setFile(file);
    console.log(file);
  };

  //TODO: un-used?
  const logFile = () => {
    console.log(file);
  }
  

  const saveFoto = async() => {
    // file is gekozen:
    if(file){
      console.log(file);
      const formData = new FormData();

      const dateUploaded = new Date();
      const userID = contextID;

      formData.append(
        "fotoFile",
        file,
      );
      formData.append(
        "userID",
        userID
      );
      formData.append(
        "dateUploaded",
        dateUploaded.toISOString() //added parsing 2-7-24
      );//console.log(formData.getHeaders());//test
      await save("fotos/save", formData);
    }else{
      console.log(file);
      // een bericht tonen dat je eerst een file moet kiezen
    }
    

  }


  return (
    <>
    {/* <Error error={saveError} /> */}
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    <button onClick={saveFoto} className="btn btn-primary">ClickMe</button>
    <hr/>
    </>
  );
}

export default DragDrop;