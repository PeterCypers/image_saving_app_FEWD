import { useLocation, useNavigate } from "react-router-dom";

export const NotFound = () => {
    // testcode
    const location = useLocation();
    console.log(location);
    //
    const navigate = useNavigate();

    const handleGoHome = () => navigate("/", { replace: true });
    const { pathname } = useLocation();
    return (
        <>
        <div>
        <h1>Page not found</h1>
        <p>There is no page with url {pathname}, try something else.</p>
        </div>
        <hr />
        <button className='btn btn-primary' onClick={handleGoHome}>Go Home!</button>
        </>
    );
};