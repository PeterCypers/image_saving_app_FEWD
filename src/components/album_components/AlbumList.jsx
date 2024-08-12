import { useEffect, useRef } from "react";
import Album from "./Album";


// albumID, albumName, creationDate, userID
const AlbumList = ({ albums, onSelect, selectedAlbum, onDelete, onEdit }) => {
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
        {albums.map((album) => (
          <Album 
            key={album.albumID}
            albumID={album.albumID}
            albumName={album.albumName}
            creationDate={album.creationDate}
            userID={album.userID}
            onSelect={onSelect}
            isSelected={album.albumID === selectedAlbum}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
    </div>
    </>
  );
};

export default AlbumList;