import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AppModal({buttonText='Open Modal' ,buttonAttributes={variant:"dark"}, title='Title', modalContent =<h3>No content were provided</h3>}) {

  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }

  return (
    <>
        <Button {...buttonAttributes} onClick={() => handleShow()}>{buttonText}</Button>

      <Modal show={show} fullscreen='lg-down' onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default AppModal;