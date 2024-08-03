import { useState, useEffect, useCallback } from "react";
import Error from './Error';

export default function AddToAlbumForm({ imageId, albums, onAdd, onCancel, addToAlbumError, albumSuccessMessage, setAlbumSuccessMessage }) {
  const [selectedAlbum, setSelectedAlbum] = useState(''); // = albumId
  const [newAlbumName, setNewAlbumName] = useState('');
  const [error, setError] = useState('');
  const [newAlbumError, setNewAlbumError] = useState('');
  const [ addAlbumErrorMessage, setAddAlbumErrorMessage ] = useState('');
  const [ addAlbumSuccessMessage, setAddAlbumSuccessMessage ] = useState('');

// axios error bestaat:
  useEffect(() => {
    if (addToAlbumError) {
        if (addToAlbumError.response.data?.message.includes(`${imageId}`)){
            setAddAlbumErrorMessage(addToAlbumError.response.data.message);
        }
        else{
            setAddAlbumErrorMessage('');
        }
    }
  }, [addToAlbumError]);

  useEffect(() => {
    if (albumSuccessMessage && !albumSuccessMessage.includes('reset')){
        if (Number(albumSuccessMessage.match(/\d+/)[0]) === imageId){
            setAddAlbumSuccessMessage(albumSuccessMessage);
        }
        else{
            setAddAlbumSuccessMessage('');
        }
    }
  }, [albumSuccessMessage]);

  const handleAlbumSelect = (e) => {
      const selectedAlbumId = e.target.value;
      setSelectedAlbum(selectedAlbumId);

      //case: filling in 'x' in new album & then selecting 'x' in options would lead to an error
      setNewAlbumName('');
      setNewAlbumError('');
      setAddAlbumErrorMessage('');
      setAddAlbumSuccessMessage('');
      setAlbumSuccessMessage('reset'); //set state of the Fotos.albumSuccessMessage with a !!non-empty!! value to trigger props-change-chain, it'll be overwritten with relevant messages
      setError(''); //reset err message on selecting a new album

  };

  const onSubmit = () => {
      if (!selectedAlbum && !newAlbumName) {
          setError('Please select an existing album or enter a new album name.');
          setNewAlbumError('');
          return;
      }

      if (newAlbumName && albums.some(album => album.albumName === newAlbumName)) {
          setNewAlbumError('Album name already exists. Please choose a different name.');
          setError('');
          return;
      }

      if (error){
        return
      }

      onAdd(selectedAlbum, newAlbumName);


      //needed?
    //   if (!addToAlbumError) {
    //     setSelectedAlbum('');
    //     setNewAlbumName('');
    //   }

  };


  return (
      <div className="card-body">
          <div className="form-group">
              <label htmlFor="albumSelect">Select Album</label>
              <select
                  id="albumSelect"
                  className="form-control"
                  value={selectedAlbum}
                  onChange={handleAlbumSelect}
              >
                  <option value="">-- Select an Album --</option>
                  {albums.map((album) => (
                      <option key={album.albumID} value={album.albumID}>{album.albumName}</option>
                  ))}
              </select>
          </div>
          {!selectedAlbum && (
              <div className="form-group">
                  <label htmlFor="newAlbum">Create New Album</label>
                  <input
                      type="text"
                      id="newAlbum"
                      className="form-control"
                      value={newAlbumName}
                      onChange={(e) => setNewAlbumName(e.target.value)}
                  />
                  {(error || newAlbumError) && <div className="text-danger ml-2 mb-2">{error?error:newAlbumError}</div>}
                  {/* {(addToAlbumError) && <div  className="text-danger">{addToAlbumError.response.data?.message}</div>} */}
                  {/* <Error error={axiosErrorState} /> */}

              </div>
          )}
          {(addAlbumErrorMessage) && <div  className="text-danger ml-2 mb-2">{addAlbumErrorMessage}</div>}
          {(!addAlbumErrorMessage && addAlbumSuccessMessage) && <div  className="text-success ml-2 mb-2">{addAlbumSuccessMessage}</div>}
          <div className="d-flex p-2 justify-content-around">
              <button type="button" className="btn btn-primary" onClick={onSubmit}>Add</button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
      </div>
  );
}
