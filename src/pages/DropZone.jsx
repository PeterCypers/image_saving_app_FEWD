import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({}) {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    console.log(file);
  };
  const logFile = () => {
    console.log(file);
  }
  return (
    <>
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    <button onClick={logFile} className="btn btn-primary">ClickMe</button>
    <hr/>
    </>
  );
}

export default DragDrop;