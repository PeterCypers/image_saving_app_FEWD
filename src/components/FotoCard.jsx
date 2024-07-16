import { useCallback, useState, memo } from "react";
import { useOutletContext } from "react-router-dom";

//TODO: add to album -> how will it work? at the moment I was thinking of replacing the button when clicked with a list of 
//available albums to choose from or a txt field where a new albumname can be added and another btn to actually add to album
//delete btn should show a confirmation 
export default function FotoCard({
    imageId,
    location,
    dateUploaded,
    onSetVisibility,
    visibleId
  }) {
    const [ addToAlbum, setAddToAlbum ] = useState(true);
    const [ contextID ] = useOutletContext();

    // TODO: er is nog het probleem dat alle foto's re-renderen met de huidige werkwijze
    // const [ visibleCardOptions, setVisibleCardOptions ] = useState(false);

    // function toggleOptionsVisibility() {
    //   setVisibleCardOptions(!visibleCardOptions);
    // }

    const setVisibleCard = useCallback(() => {
      onSetVisibility(imageId);
    }, [imageId, onSetVisibility]);

    return (
      <>
      <div className="card m-4" /*style={{ width: "18rem" }}*/>
        {/* img path is absolute from the project-root */}
      <img className="card-img-top" src="src/images/card_test.jpg" alt="Card image cap" onClick={setVisibleCard} />
        {visibleId === imageId && <div className="card-body">
          {/* <p className="card-text">possible card - description.</p> */}
          <div className="d-flex p-2 justify-content-around">
            <button className="btn btn-primary">delete</button>
            <button className="btn btn-primary">add to album</button>
          </div>
        </div>}
      </div>
      </>
    )
};