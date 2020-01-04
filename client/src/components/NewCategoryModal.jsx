import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const NewCategoryModal = () => {
  const [show, setShow] = useState(false);
  const [bucketName, setBucketName] = useState('')

  const handleClose = () => {
    setShow(false);
  }
  const handleChange = e => {
    setBucketName(e.target.value)
  }
  async function postNewCategory(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
  const handleSave = e => {
    e.preventDefault()
    postNewCategory((process.env.REACT_APP_API_SERVER + "/add-category/" + process.env.REACT_APP_TEST_USER_PROVIDERID), {bucket_name: bucketName})
    setShow(false);
  }
  const handleShow = () => setShow(true);

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
          <form id="add-category" className="go-bottom">
            <div className="form-input-container">
              <input onChange={handleChange} id="category" name="bucket_name" type="text" required/>
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