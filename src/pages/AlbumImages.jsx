import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getAlbumImages, deleteById  } from "../api";
import AlbumFotoCard from "../components/album_components/AlbumFotoCard";

export default function AlbumImages() {
  const { albumId } = useParams(); // Get the albumId from the URL
  const { selectedAlbum, albumIndex } = useOutletContext(); // I require the number of the albums in the list, not the albumID which could be a confusing number depending on the active user...
  const navigate = useNavigate();

  // multi-arg
  /* conditional fetching with null & passing a function with parameter -> lambda
  Good: () => getById(albumId) -> passed as a function to call | Bad: getById(albumId) -> immediate call*/
  // const { 
  //   data: albumImages,
  //   error 
  // } = useSWR(albumId ? { url: '/albums', id: albumId } : null, (args) => getById(args));

  // single-arg
  const { 
    data: albumImages,
    error,
  } = useSWR(albumId ? `albums/${albumId}/images` : null, () => getAlbumImages(albumId));

  //useEffect(() => {if(!error){ console.log(selectedAlbum, albumImages);}},[albumImages, selectedAlbum]); //testing


  useEffect(() => {
    if (error) {
      // If there's no album data or an error, redirect to the albums page
      navigate('/albums', { replace: true });
      //case potential to access another user's album -> should be handled in back-end, but just in case...
    } else if (selectedAlbum !== -1 && selectedAlbum.toString() !== albumId) {
      navigate('/albums', { replace: true });
    }
  }, [/*albumImages,*/ error, selectedAlbum, albumId, navigate]);



  const {
    trigger: handleAlbumFotoDelete,
    error: deleteAlbumFotoError 
   } = useSWRMutation(`albums/${albumId}/images`, deleteById);

  // NOTE: !! als je na deze code een Hooks durft zetten dan breekt alles !!
  // tegen de regels van hooks -> ze moeten top lvl zijn en eerst komen voor eender welk andere code
  if (error) return <div>Error loading images</div>;
  if (!albumImages) return <div>Loading...</div>;

  return (
    <div>
      <h2>Images for Album {albumIndex !== 0 ? albumIndex : 1}</h2>
      <div className="d-flex flex-wrap">
        {albumImages.map((image) => (
          <AlbumFotoCard 
            key={image.fotoID} 
            fotoID={image.fotoID} 
            location={image.location} 
            dateUploaded={image.dateUploaded} 
            onDelete={handleAlbumFotoDelete}
          />
        ))}
      </div>
    </div>
  );
}