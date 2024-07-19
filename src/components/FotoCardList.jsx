import { useCallback, useState } from 'react';
import FotoCard from './FotoCard';



// TODO: get-request all albums as an array in above component
export default function FotoCardList({ allFotos, albums, onAddPhotoToAlbum }) {
  const [ visibleCardId, setVisibleCardId ] = useState(-1);
  //console.log(Object.values(allFotos));
  const handleSetVisibility = (fotoId) => {
   //console.log(fotoId);
    if(fotoId === visibleCardId){
      setVisibleCardId(-1);
    }else{
      setVisibleCardId(fotoId);
    }
  };

  const mockAlbums = [
    { id: 1, name: 'Vacation 2021' },
    { id: 2, name: 'Family' },
    { id: 3, name: 'Work Events' },
    { id: 4, name: 'Nature Trips' },
  ];

  const passAddPhotoToAlbumUp = (selectedAlbum, newAlbumName, imageId) => {
    onAddPhotoToAlbum(selectedAlbum, newAlbumName, imageId);
  };

  return (
    <div className="foto-card-list">
      {allFotos.map((foto) => (
        <FotoCard 
          key={foto.fotoID}
          imageId={foto.fotoID}
          location={foto.location}
          dateUploaded={foto.dateUploaded}
          onSetVisibility={handleSetVisibility}
          visibleId={visibleCardId}
          albums={mockAlbums}
          onAddPhotoToAlbum={passAddPhotoToAlbumUp}
        />))}
    </div>
  )
}