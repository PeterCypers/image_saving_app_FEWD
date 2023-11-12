import useSWR from "swr";
import { getAll, getById } from "../api";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";


// TODO: fotos in een card component met features om ze aan albums toe te voegen of om ze te verwijderen
export default function Fotos() {
    // const id = document.getElementById("id-select").value;
    const [ contextID ] = useOutletContext();
    // TODO:(1) get-all: (won't be used once login is achieved)
    const {
        data: allFotos = [],
    } = useSWR('fotos', getAll);
    // end(1)
    const {
        data: byId = [],
    } = useSWR(`fotos/${contextID}`, getById);
    /** getByID geeft de data.items terug: type=array van obj met defaultvalue = leeg array om fouten te vermijden
     * {"items": [
        {
            "fotoID": 5,
            "location": "../assets/foto5",
            "dateUploaded": "2023-11-14T23:00:00.000Z",
            "userID": 5
        },{...},...
        ],
        "count": 6
    }
     */

    return (
        <>
        <h2>--All Fotos--</h2>
        {allFotos.map((foto) => {
            return <p key={foto.fotoID}>{foto.location}</p>
        })}
        <h2>--Fotos User #{contextID}--</h2>
        {byId.map((foto) => {
            return <p key={foto.fotoID}>User ID: {foto.userID} <br/>DateUploaded: {foto.dateUploaded} <br/>Foto ID: {foto.fotoID}</p>
        })}

        <hr/>
        </>
    );
}