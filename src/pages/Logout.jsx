//behavioral component
import { useEffect } from "react";
import { useAuth } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { isAuthed, logout } = useAuth();

  const navigate = useNavigate();

  const handleGoHome = () => navigate("/", { replace: true });

  useEffect(() => logout(), [logout]);


  return (
    <div className="container" data-cy="logout_feedback">
      <div className="row">
        <div className="col-md-12 text-center mt-5">
          <h1>
            {isAuthed ? "Logging out..." : "You were successfully logged out"}
          </h1>
        </div>
      </div>
      {!isAuthed && (
        <button className='btn btn-primary' onClick={handleGoHome}>Home</button>
      )}
    </div>
  )

}