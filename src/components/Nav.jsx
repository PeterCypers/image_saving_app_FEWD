import { NavLink } from 'react-router-dom'

function Nav() {
    return (
        <div className='mb-2 border border-primary rounded'>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/dropzone">Add Image</NavLink> 
                    </li>
                    <li>
                        <NavLink to="/fotos">Images</NavLink> 
                    </li>
                    <li>
                        <NavLink to="/albums">Albums</NavLink> 
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