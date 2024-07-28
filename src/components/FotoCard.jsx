import { useCallback, useState, memo, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import AddToAlbumForm from "./AddToAlbumForm";

//TODO: add to album -> how will it work? at the moment I was thinking of replacing the button when clicked with a list of 
//available albums to choose from or a txt field where a new albumname can be added and another btn to actually add to album
//delete btn should show a confirmation 
export default function FotoCard({
    imageId,
    location,
    dateUploaded,
    albums,
    onSetVisibility,
    visibleId,
    onAddPhotoToAlbum,
    addToAlbumError,
    resetAlbumError,
    albumSuccessMessage,
    setAlbumSuccessMessage
  }) {
    const [ showAddToAlbum, setShowAddToAlbum ] = useState(false);
    const [ contextID ] = useOutletContext();
    //const [thisCardHasAxiosError, setThisCardHasAxiosError] = useState(addToAlbumError? true: false);
    const [ errorMessage, setErrorMessage ] = useState("");


    const setVisibleCard = useCallback(() => {
      onSetVisibility(imageId);
    }, [imageId, onSetVisibility]);

    const handleAddToAlbumClick = () => {
      resetAlbumError(); //reset from useSWRMutation to clear the lingering error msg when reloading the form
      fotoCardSetAlbumSuccessMessage('');
      setShowAddToAlbum(true);
    };

    const fotoCardSetAlbumSuccessMessage = async (message) => {
      setAlbumSuccessMessage(message);
    }

    const handleCancel = () => {
        setShowAddToAlbum(false);
    };

    const handleAdd = async (selectedAlbum, newAlbumName) => {
      //attempt
      //resetAlbumError();

      const success = await onAddPhotoToAlbum(selectedAlbum, newAlbumName, imageId);
      console.log(success);
      if (!success /*addToAlbumError && addToAlbumError.response.data?.message.includes(`${imageId}`)*/){
        setShowAddToAlbum(true);
        console.log("in fail");

      }else{
        setShowAddToAlbum(false);
        console.log("in success");
      }
    };

    return (
      <div className="card m-4" /*style={{ width: "18rem" }}*/>
        {/* img path is absolute from the project-root */}
      <img className="card-img-top card_img_hover" src={location} alt="Card image cap" onClick={setVisibleCard} />
      {visibleId === imageId && (
                <>
                    {showAddToAlbum ? (
                        <AddToAlbumForm imageId={imageId} albums={albums} onAdd={handleAdd} onCancel={handleCancel} addToAlbumError={addToAlbumError} albumSuccessMessage={albumSuccessMessage} setAlbumSuccessMessage={fotoCardSetAlbumSuccessMessage} />
                    ) : (
                        <div className="card-body">
                            <div className="d-flex p-2 justify-content-around">
                                <button className="btn btn-primary">delete</button>
                                <button className="btn btn-primary" onClick={handleAddToAlbumClick}>add to album</button>
                            </div>
                        </div>
                    )}
                </>
            )}
      </div>
    )
};