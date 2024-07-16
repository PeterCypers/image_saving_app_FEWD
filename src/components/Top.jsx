import { Nav } from './Nav';
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Top() {
  //TODO: set real user-id in state after login or get it from the auth-context and put that in outlet context
    const [ userID, setUserID ] = useState('1');

    const navigate = useNavigate();

    const handleGoHome = () => navigate("/", { replace: true });

    return (
    <>
      <header id="page-header">
      <h1 className='permanent-marker-regular'>Image Collection</h1>

      {/* TODO: replace with real login component */}
      <div id="login-component-placeholder">
        <button id="login-btn">
          <img id="login-img" src="src/images/login01.png" alt="" />
        </button>
        <p>login placeholder</p>
      </div>

      </header>

      <label htmlFor="id-select" className="mr-2">Select User: {"  "}</label>
      <select name="userIds" id="id-select" onChange={(e) => setUserID(e.target.value)}>
        <option value="1">Default User = 1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <p>current user: {userID}</p>
      <Nav/>
      {/* <Outlet /> rendert alle (hoofd)routes */}
      <Outlet context={userID}/>
      <button className='btn btn-primary' onClick={handleGoHome}>Home</button>
    </>
    
    );
}