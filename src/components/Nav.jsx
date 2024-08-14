import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <div className='mb-2 border border-primary rounded'>
            <nav className="main-nav">
                <ul>
                    <li data-cy="dropzone_link">
                        <NavLink to="/dropzone">Add Image</NavLink> 
                    </li>
                    <li data-cy="images_link">
                        <NavLink to="/fotos">Images</NavLink> 
                    </li>
                    <li data-cy="albums_link">
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