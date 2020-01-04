import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const NewCategoryModal = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
  }
  const handleSave = (e) => {
    addNewCategory();
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const addNewCategory = () => {
    console.log('add new clicked')
  }
  return (
    <>
      <Button 
        block 
        variant="secondary" 
        onClick={handleShow}
      >
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="add-category" action={process.env.REACT_APP_API_SERVER + "/add-category/" + process.env.REACT_APP_TEST_USER_PROVIDERID} method="post" className="go-bottom">
            <div className="form-input-container">
              <input id="category" name="bucket_name" type="text" required/>
              <label for="description">New Category</label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="add-category" variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewCategoryModal