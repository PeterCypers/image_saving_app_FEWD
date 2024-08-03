import React, { useCallback } from 'react';
//import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton'; // Import the DeleteButton component

const AlbumFotoCard = ({ fotoID, location, dateUploaded, onDelete }) => {

  const passOnDeleteUp = useCallback(() => {
    onDelete(fotoID);
  }, [fotoID, onDelete]);

  return (
    <div className="card albumCard">
      {/* Delete Button */}
      <DeleteButton onClick={passOnDeleteUp} />

      {/* Image */}
      <img 
        src={location} 
        className="card-img-top albumCardImage" 
        alt={`Image ${fotoID}`} 

      />

      {/* Card Body */}
      {/* <div className="card-body">
        <p className="card-text">
          Uploaded: {new Date(dateUploaded).toLocaleDateString()}
        </p>
      </div> */}
    </div>
  );
};

// validation for props...

// AlbumFotoCard.propTypes = {
//   fotoID: PropTypes.string.isRequired,
//   location: PropTypes.string.isRequired,
//   dateUploaded: PropTypes.string.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

export default AlbumFotoCard;
