import React from 'react'

import Modal from 'react-bootstrap/Modal'

const ReceiptModal= (props) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <span>
      {/* <img onClick={handleShow} className="receipt-icon" alt="receipt image" src={ReceiptImage}></img> */}
      <span onClick={handleShow}>Receipt</span>
      <Modal show={show} onHide={handleClose}>
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
    </span>
  );
}

export default ReceiptModal
