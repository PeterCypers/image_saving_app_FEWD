import { NavLink } from 'react-router-dom'

function Nav() {
    
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