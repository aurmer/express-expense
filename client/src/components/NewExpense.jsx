import React from 'react'
import { connect } from 'react-redux'
import { receiptLoaded } from '../redux/actions'

import ReceiptUpload from './ReceiptUpload'

import Button from 'react-bootstrap/Button'
import NewCategoryModal from './NewCategoryModal'

class NewExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  fetchCategories() {
    fetch(process.env.REACT_APP_API_SERVER + "/get-categories/" + process.env.REACT_APP_TEST_USER_PROVIDERID)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({ categories: data})
    })
  }
  renderCategories(categories) {
    return (
      <>
        <option value="" selected>Select a category</option>
        {categories.map((category, index) => {
          return (
            <option value={category.id} key={index}>{category.bucket_name}</option>
          )
        })}
      </>
    )
  }
  componentDidMount() {
    this.fetchCategories()
  }
  render() {
    
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
        <form action={process.env.REACT_APP_API_SERVER + "/add-expense/" + process.env.REACT_APP_TEST_USER_PROVIDERID} method="post" className="go-bottom">
          <div className="form-input-container">
            <ReceiptUpload />
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
          <div className="category-container">
            <div className="form-input-container form-select-container">
              <select id="category" name="bucket_id">
                {this.renderCategories(this.state.categories)}
              </select>
            </div>
            <div className="add-category-btn-container">
              <NewCategoryModal/>
            </div>
          </div>
          <Button
            type="submit"
            block
            className="form-save-btn"
          >
            Save New Expense
          </Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(
  mapStateToProps,
  { receiptLoaded }
)(NewExpenseForm)
