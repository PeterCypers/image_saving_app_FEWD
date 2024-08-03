import useSWR from "swr";
import { useState, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { deleteById, getAll, getById, /*create, update,*/ } from "../api";
import useSWRMutation from 'swr/mutation';
import AlbumList from '../components/album_components/AlbumList';

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

    const handleAlbumSelect = (albumID) => {
        setSelectedAlbum(albumID);
        navigate(`/albums/${albumID}`); // Navigate to the album images page
    }

    const findAlbumPosition = () => {
        return allAlbums.findIndex(album => album.albumID === selectedAlbum) + 1;
    }

    const outletContextValue = useMemo(() => {
        return {
            selectedAlbum,
            albumIndex: findAlbumPosition(),
        };
    }, [selectedAlbum, allAlbums]);


    return (
        <>
        <AlbumList albums={allAlbums} onSelect={handleAlbumSelect} selectedAlbum={selectedAlbum} onDelete={handleAlbumDelete} />
        <hr/>
        <Outlet context={outletContextValue}/>
        </>
    );
}