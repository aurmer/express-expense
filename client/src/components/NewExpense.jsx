import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { receiptLoaded } from '../redux/actions'

const NewExpenseForm = () => {
  return (
    <div>
      <form className="go-bottom">
        <div className="form-input-container">
          <div className="receipt-img-container">
            <img className="receipt-img" src="" alt="receipt"></img>
          </div>
          <div className="file-input-container">
            <input id="receiptImage" type="file" accept="image/*"/>
          </div>
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
