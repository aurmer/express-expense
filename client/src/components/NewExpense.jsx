import React from 'react'
import Button from 'react-bootstrap/Button'


const NewExpenseForm = () => {
  return (
    <div>
      <form className="go-bottom">
        <div className="form-input-container">
          <div className="receipt-img-container">
            <img className="receipt-img" src="https://via.placeholder.com/200x500"></img>
          </div>
          <div className="file-input-container">
            {/* <input type="file" accept="image/*"/> */}
            <label className="input-group-btn">
              <span className="btn file-input-btn">
                Upload receipt <input type="file" style={{display: "none"}} multiple accept="image/*"/>
              </span>
            </label>
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