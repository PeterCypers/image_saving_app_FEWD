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
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  //testing lable change of the component -> doesn't seem to work TODO: revisit -> if it breaks, remove from state & props
  const [label, setLabel] = useState("Drag and drop your file here or click to select");

  // const {
  //   trigger: saveFoto,
  //   error: saveError,
  // } = useSWRMutation('transactions', save);

  const handleChange = (file) => {
    setMessage(null);
    setFile(file);
    setLabel(`File selected: ${file.name}`); //werkt niet
    console.log(file);
    // console.log(typeof file.lastModifiedDate) -> object type
  };

  // results in null if called instead of the console.log(file)
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
        dateUploaded.toISOString() //added parsing 2-7-24 (is always a string even without parsing toISOString happens regardless)
      );//console.log(formData.getHeaders());//test

      try {
        await save("fotos/save", formData);
        setMessage('File uploaded successfully');
        setIsSuccess(true);

      } catch (error) {
        if (error.response && error.response.status === 409) {
          setMessage('File already exists');
        } else {
          setMessage('Error uploading file');
        }
        setIsSuccess(false);
      }
      

    } else {
      console.log(file);
      setMessage('Please select a file first');
      setIsSuccess(false);
    }
  }

  // surround FileUploader with div component & onclick = clear msg -> doesn't work
  return (
    <>
    {/* <Error error={saveError} /> */}
    {/* <div onClick={() => setMessage(null)}> */}
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} label={label} />
    {/* </div> */}
    {message && (
      <p id={isSuccess ? 'success-message' : 'error-message'}>
        {message}
        </p>
    )}
    <button onClick={saveFoto} className="btn btn-primary">Save Image</button>
    <hr/>
    </>
  );
}

export default DragDrop;