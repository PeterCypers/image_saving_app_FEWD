import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import useSWR from "swr";
import { getAlbumImages  } from "../api"; // Assume you have a function to fetch album by ID

export default function AlbumImages() {
  const { albumId } = useParams(); // Get the albumId from the URL
  const selectedAlbum = useOutletContext(); // Get the selectedAlbum from Outlet context
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
    error 
  } = useSWR(albumId ? `albums/${albumId}/images` : null, () => getAlbumImages(albumId));

  useEffect(() => {
    if (error) {
      // If there's no album data or an error, redirect to the albums page
      navigate('/albums', { replace: true });
    } else if (selectedAlbum !== -1 && selectedAlbum.toString() !== albumId) {
      // If selectedAlbum doesn't match the URL albumId, handle it (e.g., update the selectedAlbum)
      // You could also redirect or show a warning message if the mismatch is an issue
    }
  }, [albumImages, error, selectedAlbum, albumId, navigate]);

  //TODO: add blackbox spinner to loading
  if (error) return <div>Error loading images</div>;
  if (!albumImages) return <div>Loading...</div>;

  //TODO replace with a new component AlbumImage (no list required, it also has a trash-bin with ondelete prop)
  return (
    <div>
      <h2>Images for Album {albumId}</h2>
      <div className="image-gallery">
        {albumImages.map(image => (
          <img key={image.fotoID} src={image.location} alt={`Image ${image.fotoID}`} style={{height: "150px", width: "150px", padding: "5px"}} />
        ))}
      </div>
    </div>
  );
}
