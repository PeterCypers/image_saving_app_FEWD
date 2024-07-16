import { useCallback, useState } from 'react';
import FotoCard from './FotoCard';

export default function FotoCardList({ allFotos }) {
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


  return (
    <div className="foto-card-list">
      {allFotos.map((foto) => (
        <FotoCard key={foto.fotoID} imageId={foto.fotoID} location={foto.location} dateUploaded={foto.dateUploaded} onSetVisibility={handleSetVisibility} visibleId={visibleCardId}/>))}
    </div>
  )
}