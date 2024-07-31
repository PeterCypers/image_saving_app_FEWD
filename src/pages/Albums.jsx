import useSWR from "swr";
import { deleteById, getAll, getById, /*create, update,*/ postPhoto } from "../api";
import FotoCard from '../components/FotoCard';
import AlbumList from '../components/album_components/AlbumList';

export default function Albums() {

    const {
        data: allAlbums = [],
    } = useSWR('albums', getAll);


    return (
        <>
        <h2>Albums</h2>
        {/* TODO: remove card, temp design testspace */}
        <FotoCard />
        <AlbumList albums={allAlbums} />
        <hr/>
        </>
    );
}