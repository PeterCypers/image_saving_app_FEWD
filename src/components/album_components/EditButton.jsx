import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditButton = ({ albumName, onSave }) => {
  const [show, setShow] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState(albumName);
  const maxLength = 25;

  const handleClick = (e) => {
    e.stopPropagation();
    setShow(true);
  };

  const handleClose = () => setShow(false);
  const handleSave = () => {
    onSave(newAlbumName);
    setShow(false);
  };

  return (
    <>
      <div 
        className="edit-button" 
        onClick={handleClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
        </svg>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Album Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>New Album Name</Form.Label>
            <Form.Control 
              type="text" 
              value={newAlbumName} 
              onChange={(e) => setNewAlbumName(e.target.value)} 
              maxLength={maxLength} 
              placeholder="Enter new album name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </Button>
          <Button variant="primary" onClick={handleSave}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
              <path d="M13.485 1.98a.5.5 0 0 1 .693.717l-8 8.5a.5.5 0 0 1-.712-.028l-4-4.5a.5.5 0 0 1 .722-.694l3.764 4.232 7.533-7.727z"/>
            </svg>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditButton;
