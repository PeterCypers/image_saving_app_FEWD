import Nav from "./components/pageElements/Nav"
import DragDrop from "./components/pageElements/DropZone"

function App() {

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
    
      <Nav />
      <DragDrop />
      <main>
        
      </main>
    </>
  )
}

export default App
