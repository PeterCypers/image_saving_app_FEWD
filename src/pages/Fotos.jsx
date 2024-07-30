import useSWR from "swr";
import { getAll, getById, /*create, update,*/ postPhoto } from "../api";
import { useOutletContext } from "react-router-dom";
import { useState, useCallback } from "react";
import FotoCardList from "../components/FotoCardList";
import useSWRMutation from 'swr/mutation';


export default function Fotos() {
    // const [ contextID ] = useOutletContext(); (1):zie top

    const [errorMessage, setErrorMessage] = useState('');
    const [axiosError, setAxiosError] = useState(null); //not used -> error from useSWRMut == axiosError
    const [albumSuccessMessage, setAlbumSuccessMessage] = useState('');

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


    // TODO *
    // const { trigger: createAlbum, error: createError } = useSWRMutation('albums', create);
    const { trigger: addPhotoToAlbum, error: addToAlbumError, reset: resetAlbumError } = useSWRMutation('albums', postPhoto);
    const { trigger: createAlbumAndAddPhotoToAlbum, error: createAndAddToAlbumError, reset: resetCreateAlbumError } = useSWRMutation('albums/create-and-add-photo', postPhoto);

    // const { trigger: deleteTransaction, error: deleteError } = useSWRMutation('albums', save);

    // Function to handle adding photo to album TODO: handle properly using api-call & generate the Date() = dateUploaded here -> maybe formatting to set in db or sent to backend needed
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
    },[addPhotoToAlbum]);

    return (
      <>
        {/* <h2>--Fotos User #{contextID}--</h2> */} {/* (1) */ }
        {fotosError ? (
            <div>{fotosError}</div>
        ) : isLoading ? (
            <div>Loading...</div>
        ) : (
            <FotoCardList 
                allFotos={allFotos}
                onAddPhotoToAlbum={handleAddPhotoToAlbum}
                albums={allAlbums}
                addToAlbumError={addToAlbumError /* || createAndAddToAlbumError */} // create & add should cause no conflicts...case handled in: components/AddToAlbumForm.jsx.onSubmit() //TODO: followup
                resetAlbumError={resetAlbumError /* || resetCreateAlbumError */} // create & add should cause no conflicts...case handled in: components/AddToAlbumForm.jsx.onSubmit() //TODO: followup
                albumSuccessMessage={albumSuccessMessage}
                setAlbumSuccessMessage={handleSetAlbumSuccessMessage}
            />
        )}
        <hr />
      </>
    );
}