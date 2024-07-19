import useSWR from "swr";
import { getAll, getById } from "../api";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import FotoCardList from "../components/FotoCardList";


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
        data: byIdData = [],
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

    // Function to handle adding photo to album TODO: handle properly using api-call & generate the Date() = dateUploaded here -> maybe formatting to set in db or sent to backend needed
    const handleAddPhotoToAlbum = (selectedAlbum, newAlbumName, imageId) => {
        if (selectedAlbum) {
        console.log(`Adding image ${imageId} to existing album ${selectedAlbum}`);
        // Handle logic to add image to existing album (selectedAlbum.id or selectedAlbum.name)
        } else if (newAlbumName) {
        console.log(`Adding image ${imageId} to new album ${newAlbumName}`);
        // Handle logic to create new album with newAlbumName and add image to it
        } else {
        console.error('No valid album selected or created');
        }
    };

    return (
      <>
        <h2>--Fotos User #{contextID}--</h2>
        {byIdError ? (
            <div>{byIdError}</div>
        ) : isLoading ? (
            <div>Loading...</div>
        ) : (
            <FotoCardList 
                allFotos={byIdData}
                onAddPhotoToAlbum={handleAddPhotoToAlbum}
            />
        )}
        <hr />
      </>
    );
}