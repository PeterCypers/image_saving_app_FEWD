import { useState } from "react";

const AlbumList = ({albums}) => {
  //const [name, setName] = useState("");
  const [selecteAlbum, setSelectedAlbum] = useState(null);
  return (
    <>
    {/* TODO define style in css file */}
    <div className="row">
        <div className="col-xs-6 col-md-3">
          <a href="#" className="thumbnail" >
            <img src="src/images/folder_empty-removebg.png" alt="..." style={{height: "150px", width: "150px"}} />
          </a>
          <p style={{maxWidth: "150px", overflow: "auto"}}></p>
        </div>
        {albums.map(() =>(
          <Album />
        ))}
    </div>
    </>
  );
};

export default AlbumList;