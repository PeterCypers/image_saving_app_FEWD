import { useCallback, useState } from 'react';
import FotoCard from './FotoCard';
//import { mockAlbums } from '../api/mock_data';


export default function FotoCardList({ allFotos, albums, onAddPhotoToAlbum, addToAlbumError, resetAlbumError, albumSuccessMessage, setAlbumSuccessMessage, onDeletePhoto }) {
  const [ visibleCardId, setVisibleCardId ] = useState(-1);
  //console.log(Object.values(allFotos));
 
  /**
   * When a card is clicked it should toggle options: visible/invisible, 
   * when a new card is clicked, previous card options: invisible
   * 
   * @param {number} fotoId the id of the foto being clicked
   */
  const handleSetVisibility = (fotoId) => {
    setVisibleCardId(fotoId === visibleCardId? -1 : fotoId);
  };

  const passAddPhotoToAlbumUp = (selectedAlbum, newAlbumName, imageId) => {
    onAddPhotoToAlbum(selectedAlbum, newAlbumName, imageId);
  };

  const passOnDeletePhotoUp = (fotoID) => {
    onDeletePhoto(fotoID);
  }

  return (
    <div className="foto-card-list" data-cy="foto_card_list">
      {allFotos.map((foto) => (
        <FotoCard 
          key={foto.fotoID}
          imageId={foto.fotoID}
          location={foto.location}
          dateUploaded={foto.dateUploaded}
          onSetVisibility={handleSetVisibility}
          visibleId={visibleCardId}
          albums={albums}
          onAddPhotoToAlbum={passAddPhotoToAlbumUp}
          addToAlbumError={addToAlbumError}
          resetAlbumError={resetAlbumError}
          albumSuccessMessage={albumSuccessMessage}
          setAlbumSuccessMessage={setAlbumSuccessMessage}
          onDeletePhoto={passOnDeletePhotoUp}
        />))}
    </div>
  )
}