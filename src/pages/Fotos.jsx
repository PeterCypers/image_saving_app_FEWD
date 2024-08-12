import useSWR from "swr";
import { deleteById, getAll, getById, /*create, update,*/ postPhoto } from "../api";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import FotoCardList from "../components/FotoCardList";
import useSWRMutation from 'swr/mutation';


export default function Fotos() {
    // const [ contextID ] = useOutletContext(); (1):zie top

    const [errorMessage, setErrorMessage] = useState('');
    const [axiosError, setAxiosError] = useState(null); //not used -> error from useSWRMut == axiosError
    const [albumSuccessMessage, setAlbumSuccessMessage] = useState('');
    // paginatie:
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleSetAlbumSuccessMessage = (successMessage) => {
        //console.log("successmessage:" + successMessage, albumSuccessMessage); //debugging
        setAlbumSuccessMessage(successMessage? successMessage : '');
      };

    // now fotos get all by logged in user
    const {
    data: allFotos = [],
    error: fotosError,
    isLoading
    } = useSWR('fotos', getAll);
    // const {
    //     data: byIdFotos = [],
    //     error: byIdError,
    //     isLoading
    // } = useSWR(`fotos/${contextID}`, getById);
    /** getByID: (om een of ander reden houd data enkel de "items" bij)
     * {"items": [
        {
            "fotoID": 5,
            "location": "../assets/foto5",
            "dateUploaded": "2023-11-14T23:00:00.000Z",
            "userID": 5
        },{...},...
        ],
        "count": 6
    }
     */

    // albums are no longer by-id get -> i was getting all by userID, now I need to just getAll
    // const {
    //     data: byIdAlbums = [],
    // } = useSWR(`albums/${contextID}`, getById);
    const {
        data: allAlbums = [],
    } = useSWR('albums', getAll);


    const { trigger: addPhotoToAlbum, error: addToAlbumError, reset: resetAlbumError } = useSWRMutation('albums', postPhoto);
    const { trigger: createAlbumAndAddPhotoToAlbum, error: createAndAddToAlbumError, reset: resetCreateAlbumError } = useSWRMutation('albums/create-and-add-photo', postPhoto);
    const { trigger: deletePhoto, error: deletePhotoError } = useSWRMutation('fotos', deleteById);
    

    // Function to handle adding photo to album || creating an album and then adding a photo
    /**
     * @param {string} selectedAlbum not an existing album "" or (example) "1" for existing album nr 1
     */
    const handleAddPhotoToAlbum = useCallback(async (selectedAlbum, newAlbumName, imageId) => {
        let success = true;
        console.log(selectedAlbum, newAlbumName, imageId);
        console.log("SelectedAlbumTruthy: ",Boolean(selectedAlbum));
        // Existing album -> add image to existing album
        try {
            if (selectedAlbum) {
                // args: ctx.param-conform names
                await addPhotoToAlbum({
                    albumID: Number(selectedAlbum),
                    imageID: Number(imageId),
                });
            console.log(`Adding image ${imageId} to existing album ${selectedAlbum}`);
            setAlbumSuccessMessage(`Successfully added image ${imageId} to album ${selectedAlbum}`);
            return true;
            // Handle logic to add image to existing album (selectedAlbum.id or selectedAlbum.name)

            // New Album POST (add album to albums table, add foto to album_foto table -> in that order)
            } else if (newAlbumName) {
                // args: db-conform names
                await createAlbumAndAddPhotoToAlbum({
                    albumName: newAlbumName,
                    fotoID: Number(imageId),
                });
            console.log(`Adding image ${imageId} to new album ${newAlbumName}`);
            setAlbumSuccessMessage(`Successfully added image ${imageId} to new album ${newAlbumName}`);
            } else {
            console.error('No valid album selected or created');
            }
            //return true;
        } catch (error) {
            success = false;
            if (error.response) {
                setAxiosError(error);
            } else {
                console.error(error.message);
            }

            //return false;
        }finally{
            return success;
        }
    },[addPhotoToAlbum, createAlbumAndAddPhotoToAlbum]);

    // pagination
    // how this code works when there is an async data-fetching operation possibly underway in useSWR('fotos', getAll):
    /*
    - Graceful Handling of Empty Arrays: JavaScript array methods like .slice() are designed to handle empty arrays gracefully.
      This makes them robust in cases where data might not be immediately available.
    - Reactivity of State and Props: In React, when the state or props change (like when allFotos is updated), 
      the component automatically re-renders with the new data. This ensures that the sliced array (currentFotos) 
      is always up-to-date with the fetched data.
    - Default Empty Array: By initializing allFotos to an empty array ([]), 
      you avoid potential errors that could occur if the component tried to slice undefined or null. 
      This initialization pattern is common in asynchronous data fetching scenarios.
    */
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFotos = allFotos.slice(indexOfFirstItem, indexOfLastItem);
    
    // select items per page (paginatie)
    // Retrieve itemsPerPage from localStorage when the component mounts
    useEffect(() => {
        const savedItemsPerPage = localStorage.getItem('itemsPerPage');
            if (savedItemsPerPage) {
                setItemsPerPage(Number(savedItemsPerPage));
            }
        }, []);
    
    const handleItemsPerPageChange = (event) => {
        const newItemsPerPage = Number(event.target.value);
        setItemsPerPage(newItemsPerPage);
        localStorage.setItem('itemsPerPage', newItemsPerPage);
        setCurrentPage(1); // Reset to the first page when items per page changes
    };

    //to top btn
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <nav aria-label="Page navigation example">
            <ul className="pagination d-flex justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </a>
                </li>
                {Array.from({ length: Math.ceil(allFotos.length / itemsPerPage) }, (_, index) => (
                    <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                        <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </a>
                    </li>
                ))}
                <li className={`page-item ${currentPage === Math.ceil(allFotos.length / itemsPerPage) ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                </a>
                </li>
            </ul>
            </nav>

            <div>
                <label htmlFor="itemsPerPageSelect" className="form-label me-2">Items per page:</label>{' '}
                <select 
                id="itemsPerPageSelect" 
                className="form-select" 
                value={itemsPerPage} 
                onChange={handleItemsPerPageChange}
                >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                </select>
            </div>
        </div>
        
        <hr />
        {/* <h2>--Fotos User #{contextID}--</h2> */} {/* (1) */ }
        {fotosError ? (
            <div>{fotosError.message}</div>
        ) : isLoading ? (
            <div>Loading...</div>
        ) : (
            <FotoCardList 
                allFotos={currentFotos}
                onAddPhotoToAlbum={handleAddPhotoToAlbum}
                albums={allAlbums}
                addToAlbumError={addToAlbumError /* || createAndAddToAlbumError */} // create & add should cause no conflicts...case handled in: components/AddToAlbumForm.jsx.onSubmit() //TODO: followup
                resetAlbumError={resetAlbumError /* || resetCreateAlbumError */} // create & add should cause no conflicts...case handled in: components/AddToAlbumForm.jsx.onSubmit() //TODO: followup
                albumSuccessMessage={albumSuccessMessage}
                setAlbumSuccessMessage={handleSetAlbumSuccessMessage}
                onDeletePhoto={deletePhoto}
            />
        )}
        <hr />

        {/* Back to Top Button */}
        <button 
          className="btn btn-primary mr-3"
          style={{ zIndex: 1000 }} 
          onClick={scrollToTop}
        >
          Back to Top
        </button>

      </>
    );
}