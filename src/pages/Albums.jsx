import useSWR from "swr";
import { useState, useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { deleteById, getAll, getById, /*create,*/ updateById } from "../api";
import useSWRMutation from 'swr/mutation';
import AlbumList from '../components/album_components/AlbumList';

const findAlbumPosition = (albums, selectedAlbum) => {
    return albums.findIndex(album => album.albumID === selectedAlbum) + 1;
  };

export default function Albums() {
    const [ selectedAlbum, setSelectedAlbum ] = useState(-1); // the selected album's ID
    const navigate = useNavigate();

    // an array of all album objects: structure: { albumID, albumName, creationDate, userID }
    const {
        data: allAlbums = [],
    } = useSWR('albums', getAll);

    // SWR mutation for deleting an album
    const {
         trigger: handleAlbumDelete,
         error: deleteAlbumError 
    } = useSWRMutation('albums', deleteById);
    
    // SWR mutation for editing an album
    const { 
        trigger: handleAlbumEdit,
        error: editAlbumError 
    } = useSWRMutation('albums', updateById);

    useEffect(() => {
        if (editAlbumError) {
          //console.log(Object.keys(editAlbumError));
          //console.log(editAlbumError.message);
          const errorMessage = editAlbumError.response?.data?.message || 'Failed to update the album. Please try again.';
          alert(errorMessage);
        }
      }, [editAlbumError]);

    const handleAlbumSelect = (albumID) => {
        setSelectedAlbum(albumID);
        navigate(`/albums/${albumID}`); // Navigate to the album images page
    }

    const outletContextValue = useMemo(() => {
        return {
            selectedAlbum,
            albumIndex: findAlbumPosition(allAlbums, selectedAlbum),
        };
    }, [selectedAlbum, allAlbums]);


    return (
        <>
        <AlbumList
            albums={allAlbums}
            onSelect={handleAlbumSelect}
            selectedAlbum={selectedAlbum}
            onDelete={handleAlbumDelete}
            onEdit={handleAlbumEdit} />
        <hr/>
        <Outlet context={outletContextValue}/>
        </>
    );
}
