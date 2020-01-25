import React from 'react'

import Modal from 'react-bootstrap/Modal'

const ReceiptModal= (props) => {
  const [show, setShow] = React.useState(props.show);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={props.hideModalCallback}>
      <Modal.Header closeButton>
        <h2>
          Receipt
        </h2>
      </Modal.Header>
      <Modal.Body
        className="receipt-image-container"
      >
        <img className="receipt-image" alt="receipt" src={props.receiptLink}></img>
      </Modal.Body>
    </Modal>
  );
}

export default ReceiptModal
