import React from 'react'
import { connect } from 'react-redux'
import ReceiptUpload from './ReceiptUpload'
import Button from 'react-bootstrap/Button'
import { receiptLoaded } from '../redux/actions'


const NewExpenseForm = () => {

  const receipt_image_box = (
    <>
      <div className="box__input">
        <input className="box__file" type="file" name="receipt" id="file" accept="image/*" />
        <label htmlFor="file"><strong>Choose a file</strong><span className="box__dragndrop"> or drag it here</span>.</label>
        <button className="box__button" type="submit">Upload</button>
      </div>
      <div className="box__uploading">Uploading&hellip;</div>
      <div className="box__success">Done!</div>
      <div className="box__error">Error! <span></span>.</div>
    </>
  )

  return (
    <div>
      <form className="go-bottom">
        <div className="form-input-container">
          <ReceiptUpload />
        </div>
        <div className="form-input-container">
          <input id="description" name="description" type="text" required/>
          <label htmlFor="description">Expense Description</label>
        </div>
        <div className="form-input-container">
          <input id="amount" name="amount" type="text" required/>
          <label htmlFor="amount">Expense Amount</label>
        </div>
        <div className="form-date form-input-container">
          <input id="date" name="date" type="date" required/>
          <label htmlFor="date">Expense Date</label>
        </div>
        <div className="form-input-container form-select-container">
          <select id="category" name="category">
            <option value="" defaultValue>Select a category</option>
            <option>DigitalCrafts</option>
            <option>Luminaire</option>
          </select>
        </div>
        <Button
          type="submit"
          block
          className="form-save-btn"
        >
          Save
        </Button>
      </form>
    </div>
  )
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(
  mapStateToProps,
  { receiptLoaded }
)(NewExpenseForm)
