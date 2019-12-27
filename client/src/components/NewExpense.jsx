import React from 'react'
import Button from 'react-bootstrap/Button'


const NewExpenseForm = () => {
  return (
    <div>
      <form className="go-bottom">
        <div className="form-input-container">
          <div className="receipt-img-container">
            <img className="receipt-img hidden" src="" alt="receipt image"></img>
            <label for="receiptImage" class="receipt">
            <span className="btn">
              Upload receipt
            </span>
            </label>
          </div>
          <div className="file-input-container">
            <input id="receiptImage" type="file" accept="image/*"/>
          </div>
        </div>
        <div className="form-input-container">
          <input id="description" name="description" type="text" required/>
          <label for="description">Expense Description</label>
        </div>
        <div className="form-input-container">
          <input id="amount" name="amount" type="text" required/>
          <label for="amount">Expense Amount</label>
        </div>
        <div className="form-date form-input-container">
          <input id="date" name="date" type="date" required/>
          <label for="date">Expense Date</label>
        </div>
        <div className="form-input-container form-select-container">
          <select id="category" name="category">
            <option value="" selected>Select a category</option>
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

export default NewExpenseForm
