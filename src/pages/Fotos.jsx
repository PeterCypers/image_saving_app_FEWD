import useSWR from "swr";
import { getAll, getById, /*create, update,*/ addPhotoToAlbumRequest } from "../api";
import { useOutletContext } from "react-router-dom";
import { useState, useCallback } from "react";
import FotoCardList from "../components/FotoCardList";
import useSWRMutation from 'swr/mutation';


// TODO: fotos in een card component met features om ze aan albums toe te voegen of om ze te verwijderen
export default function Fotos() {
    // const id = document.getElementById("id-select").value;
    const [ contextID ] = useOutletContext();

    const [errorMessage, setErrorMessage] = useState('');
    const [axiosError, setAxiosError] = useState(null);
    const [albumSuccessMessage, setAlbumSuccessMessage] = useState('');

    const {
        data: byIdFotos = [],
        error: byIdError,
        isLoading
    } = useSWR(`fotos/${contextID}`, getById);
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

    //TODO [remove] albums are no longer by-id get -> i was getting all by userID, now I need to just getAll
    const {
        data: byIdAlbums = [],
    } = useSWR(`albums/${contextID}`, getById);
    const {
        data: allAlbums = [],
    } = useSWR('albums', getAll);


    // TODO *
    // const { trigger: createAlbum, error: createError } = useSWRMutation('albums', create);
    const { trigger: addPhotoToAlbum, error: addToAlbumError, reset: resetAlbumError } = useSWRMutation('albums', addPhotoToAlbumRequest);

    // const { trigger: deleteTransaction, error: deleteError } = useSWRMutation('albums', save);

    // Function to handle adding photo to album TODO: handle properly using api-call & generate the Date() = dateUploaded here -> maybe formatting to set in db or sent to backend needed
    /**
     * @param {string} selectedAlbum not an existing album "" or (example) "1" for existing album nr 1
     */
    const handleAddPhotoToAlbum = useCallback(async (selectedAlbum, newAlbumName, imageId) => {
        let success = true;
        // Existing album -> add image to existing album
        try {
            if (selectedAlbum) {
                // TODO *
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
                // TODO *
                // await createAlbumAndAddPhotoToAlbum({
                //     albumName: newAlbumName,
                //     imageID: Number(imageId),
                //     userID: contextID
                // });
            console.log(`Adding image ${imageId} to new album ${newAlbumName}`);
            // Handle logic to create new album with newAlbumName and add image to it
            } else {
            console.error('No valid album selected or created');
            }
            //return true;
        } catch (error) {
            success = false;
            console.log(error);
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
        <h2>--Fotos User #{contextID}--</h2>
        {byIdError ? (
            <div>{byIdError}</div>
        ) : isLoading ? (
            <div>Loading...</div>
        ) : (
            <FotoCardList 
                allFotos={byIdFotos}
                onAddPhotoToAlbum={handleAddPhotoToAlbum}
                albums={allAlbums}
                addToAlbumError={addToAlbumError}
                resetAlbumError={resetAlbumError}
                albumSuccessMessage={albumSuccessMessage}
            />
        )}
        <hr />
      </>
    );
}