import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/Auth.context';

export default function PrivateRoute() {
  const { ready, isAuthed } = useAuth();
  const { pathname } = useLocation();

  const loginPath = `/login?redirect=${pathname}`; // vb /login?redirect=/places

  // nog niet authenticated
  if (!ready) {
    console.log("PrivateRoute not ready");
    return (
      // <div className="spinner-border text-primary" role="status"></div> // TODO: blackbox -> check what it looks like
      <div>
        <div>
          <div>
            <h1>Loading...</h1>
            <p>Please wait while we check your credentials.</p>
          </div>
        </div>
      </div>
    )
  }

  // we zijn aangemeld -> toon de juiste component
  if (isAuthed) {
    console.log("PrivateRoute isAuthed");
    return (<Outlet />);
  }

  console.log("PrivateRoute navigate to login");
  // auth is klaar, we zijn niet logged in
  return <Navigate replace to={loginPath} />

}