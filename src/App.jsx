import { Nav } from "./components/pageElements/Nav"
import DragDrop from "./components/pageElements/DropZone"
import { useState } from "react";


/**
 * Fully depricated:
 * Now using RouterProvider with Top as leading component.
 * 
 * @returns old app component
 */
function App() {

  const [ userID, setUserID ] = useState('1');
 

  // function setUser() {
  //   localStorage.setItem("fotoProjectID", document.getElementById("id-select").value);
  // }

  return (
    <>
    <header id="page-header">
    <h1>Foto Verzameling</h1>
    <div id="login-component-placeholder">
      <button id="login-btn">
      <img id="login-img" src="src/images/login01.png" alt="" />
      </button>
      
      <p>login placeholder</p>
    </div>
    </header>
    <label htmlFor="id-select">Select User: {"  "}</label>
    <select name="userIds" id="id-select" onChange={(e) => setUserID(e.target.value)}>
      <option value="1">Default User = 1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
    </select>
    <p>current user: {userID}</p>
    
      <Nav />
      <DragDrop />
    </>
  )
}

export default App