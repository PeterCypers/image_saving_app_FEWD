import useSWR from "swr";
import { getAll, getById, /*create,*/ update } from "../api";
import { useOutletContext } from "react-router-dom";
import { useState, useCallback } from "react";
import FotoCardList from "../components/FotoCardList";
import useSWRMutation from 'swr/mutation';


// TODO: fotos in een card component met features om ze aan albums toe te voegen of om ze te verwijderen
export default function Fotos() {
    // const id = document.getElementById("id-select").value;
    const [ contextID ] = useOutletContext();
    // TODO:(1) get-all: (won't be used once login is achieved)
    const {
        data: allFotos = [],
    } = useSWR('fotos', getAll);
    // end(1)
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

    const {
        data: byIdAlbums = [],
    } = useSWR(`albums/${contextID}`, getById);

    // TODO *
    // const { trigger: createAlbum, error: createError } = useSWRMutation('albums', create);
    // const { trigger: addPhotoToAlbum, error: updateError } = useSWRMutation('albums', update);

    // const { trigger: deleteTransaction, error: deleteError } = useSWRMutation('albums', save);

    // Function to handle adding photo to album TODO: handle properly using api-call & generate the Date() = dateUploaded here -> maybe formatting to set in db or sent to backend needed
    /**
     * @param {string} selectedAlbum not an existing album "" or (example) "1" for existing album nr 1
     */
    const handleAddPhotoToAlbum = useCallback(async (selectedAlbum, newAlbumName, imageId) => {
        // Existing album PUT
        if (selectedAlbum) {
            // TODO *
            // await addPhotoToAlbum({
            //     albumID: Number(selectedAlbum),
            //     imageID: Number(imageId),
            //     userID: contextID //TODO: change after login works
            // });
        console.log(`Adding image ${imageId} to existing album ${selectedAlbum}`);
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
    });

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
                albums={byIdAlbums}
            />
        )}
        <hr />
      </>
    );
}