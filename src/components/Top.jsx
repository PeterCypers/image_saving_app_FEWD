import { Nav } from './Nav';
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../contexts/Auth.context';

export function Top() {
  //TODO: set real user-id in state after login or get it from the auth-context and put that in outlet context
    const [ userID, setUserID ] = useState('1');
    const { isAuthed } = useAuth();

    const navigate = useNavigate();

    const handleGoHome = () => navigate("/", { replace: true });

    const handleLogin = () => {
      if (!isAuthed){
        navigate("/login", { replace: true });
      }
      if (confirm("Are you sure you want to log out?")){
        navigate("/logout", { replace: true });
      }
      
    };

    return (
    <>
      <header id="page-header">
      <h1 className='permanent-marker-regular'>Image Collection</h1>

      {/* TODO: replace with real login component */}
      <div id="login-component">
        <button id="login-btn" onClick={handleLogin}>
          <img id="login-img" src="src/images/login01.png" alt="" />
        </button>
        <p>{`${isAuthed? 'logout' : 'login'}`}</p>
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