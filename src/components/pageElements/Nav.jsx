import { Outlet, NavLink, useNavigate } from 'react-router-dom'

function Nav() {
    const navigate = useNavigate();

    const handleGoHome = () => navigate("/", { replace: true });
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/dropzone">Foto Toevoegen</NavLink> 
                    </li>
                    <li>
                        <NavLink to="/fotos">Mijn Fotos</NavLink> 
                    </li>
                    <li>
                        <NavLink to="/albums">Mijn Albums</NavLink> 
                    </li>
                </ul>
            </nav>

            <Outlet /> {/* rendert alle (hoofd)routes */}
            <button onClick={handleGoHome}>Go Home!</button>
        </div>
    );

};

function OldNav() {
    return (
                <nav id="nav-menu">
            <ul id="nav-list">
                <li>
                    <button>Foto Toevoegen</button>
                </li>
                <li>
                    Mijn Fotos
                </li>
                <li>
                    Mijn Albums
                </li>
            </ul>
        </nav>
    );
};

export { Nav, OldNav };