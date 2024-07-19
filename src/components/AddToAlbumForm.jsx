//template
import { useState } from "react";

export default function AddToAlbumForm({ albums, onAdd, onCancel }) {
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [newAlbumName, setNewAlbumName] = useState('');
  const [error, setError] = useState('');
  const [newAlbumError, setNewAlbumError] = useState('');

  const handleAlbumSelect = (e) => {
      const selectedAlbumId = e.target.value;
      setSelectedAlbum(selectedAlbumId);

      //case: filling in 'x' in new album & then selecting 'x' in options would lead to an error
      setNewAlbumName('');
      setNewAlbumError('');

  };

  const onSubmit = () => {
      if (!selectedAlbum && !newAlbumName) {
          setError('Please select an existing album or enter a new album name.');
          setNewAlbumError('');
          return;
      }

      if (newAlbumName && albums.some(album => album.name === newAlbumName)) {
          setNewAlbumError('Album name already exists. Please choose a different name.');
          setError('');
          return;
      }

      onAdd(selectedAlbum, newAlbumName);
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
                      <option key={album.id} value={album.id}>{album.name}</option>
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
                  {(error || newAlbumError) && <div className="text-danger">{error?error:newAlbumError}</div>}

              </div>
          )}
          <div className="d-flex p-2 justify-content-around">
              <button type="button" className="btn btn-primary" onClick={onSubmit}>Add</button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
      </div>
  );
}
