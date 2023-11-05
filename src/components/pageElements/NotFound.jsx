import { useLocation } from "react-router-dom";

export const NotFound = () => {
    // testcode
    const location = useLocation();
    console.log(location);
    //
    const { pathname } = useLocation();
    return (
        <div>
        <h1>Pagina niet gevonden</h1>
        <p>Er is geen pagina met als url {pathname}, probeer iets anders.</p>
        </div>
    );
};