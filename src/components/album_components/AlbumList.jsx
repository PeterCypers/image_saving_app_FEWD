import { useEffect, useRef } from "react";
import DeleteButton from "./DeleteButton";

const formatDate = (date) => {
  return date.substring(0,10);
}

// userID might not get used...
const Album = ({ albumID, albumName, creationDate, userID, onSelect, isSelected, onDelete }) => {

  return (
    <>
      <div className={`album-item ${isSelected ? 'selected' : ''}`}  >
      <DeleteButton onClick={() => onDelete(albumID)}/>
        <div 
          className="thumbnail" 
          onClick={() => onSelect(albumID)} 
        >
          <img src="/images/folder_empty-removebg.png" title={formatDate(creationDate)} alt={albumName}  />
        </div>
        <p className="mx-2">{albumName}</p>
      </div>
    </>
  );
};


// albumID, albumName, creationDate, userID
const AlbumList = ({ albums, onSelect, selectedAlbum, onDelete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      const container = containerRef.current;

      if (container) {
        // Check if the scrollbar is visible
        const hasScrollbar = container.scrollWidth > container.clientWidth;

        if (hasScrollbar) {
          container.scrollLeft += event.deltaY;
          event.preventDefault(); // Prevent the default vertical scroll
        }
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