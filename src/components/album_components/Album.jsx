import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const formatDate = (date) => {
  return date.substring(0,10);
}

// userID might not get used...
const Album = ({ albumID, albumName, creationDate, userID, onSelect, isSelected, onDelete, onEdit }) => {

  return (
    <>
      <div className={`album-item ${isSelected ? 'selected' : ''}`}  >
      <DeleteButton onClick={() => onDelete(albumID)}/>
      <EditButton albumName={albumName} onSave={(newName) => onEdit({id: albumID, newName})} />
        <div 
          className="thumbnail" 
          onClick={() => onSelect(albumID)} 
        >
          <img src="/images/folder_empty-removebg.png" title={formatDate(creationDate)} alt={albumName}  />
        </div>
        <p className="mx-2">{albumName}</p>
      </div>
    </>
  );
};

export default Album;