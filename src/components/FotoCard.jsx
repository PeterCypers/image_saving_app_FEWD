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
    onAddPhotoToAlbum
  }) {
    const [ showAddToAlbum, setShowAddToAlbum ] = useState(false);
    const [ contextID ] = useOutletContext();

    // TODO: er is nog het probleem dat alle foto's re-renderen met de huidige werkwijze
    // kan mischien opgelost worden met useMemo ipv useCallback en een context wrapper in FotoCardList
    // setVisibleCard = useMemo ...
    // const [ visibleCardOptions, setVisibleCardOptions ] = useState(false);

    // function toggleOptionsVisibility() {
    //   setVisibleCardOptions(!visibleCardOptions);
    // }

    const setVisibleCard = useCallback(() => {
      onSetVisibility(imageId);
    }, [imageId, onSetVisibility]);

    const handleAddToAlbumClick = () => {
      setShowAddToAlbum(true);
    };

    const handleCancel = () => {
        setShowAddToAlbum(false);
    };

    const handleAdd = (selectedAlbum, newAlbumName) => {

      onAddPhotoToAlbum(selectedAlbum, newAlbumName, imageId);
      setShowAddToAlbum(false);
    };

    return (
      <div className="card m-4" /*style={{ width: "18rem" }}*/>
        {/* img path is absolute from the project-root */}
      <img className="card-img-top card_img_hover" src={location} alt="Card image cap" onClick={setVisibleCard} />
      {visibleId === imageId && (
                <>
                    {showAddToAlbum ? (
                        <AddToAlbumForm albums={albums} onAdd={handleAdd} onCancel={handleCancel} />
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