import { useEffect, useRef } from "react";
import DeleteButton from "./DeleteButton";

// userID might not get used...
const Album = ({ albumID, albumName, creationDate, userID, onSelect, isSelected, onDelete }) => {

  return (
    <>
    {/* TODO define style in css file */}
      <div className={`album-item ${isSelected ? 'selected' : ''}`}  style={{ position: "relative" }}>
      <DeleteButton onClick={() => onDelete(albumID)}/>
        <div 
          className="thumbnail" 
          onClick={() => onSelect(albumID)} 
          style={{ 
            cursor: 'pointer', 
            display: 'inline-block' 
          }}
        >
          <img src="/images/folder_empty-removebg.png" alt={albumName} style={{height: "150px", width: "150px"}} />
        </div>
        <p className="mx-2" style={{maxWidth: "150px", overflow: "auto"}}>{albumName}</p>
      </div>
    </>
  );
};


// albumID, albumName, creationDate, userID
const AlbumList = ({ albums, onSelect, selectedAlbum, onDelete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += event.deltaY;
        event.preventDefault(); // Prevent the default vertical scroll
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });

      return () => {
        container.removeEventListener('wheel', handleScroll);
      };
    }
  }, []);

  return (
    <>
    <div className="album-list-container" ref={containerRef}>
        {albums.map((album) =>(
          <Album 
            key={album.albumID}
            albumID={album.albumID}
            albumName={album.albumName}
            creationDate={album.creationDate}
            userID={album.userID}
            onSelect={onSelect}
            isSelected={album.albumID === selectedAlbum}
            onDelete={onDelete}
          />
        ))}
    </div>
    </>
  );
};

export default AlbumList;