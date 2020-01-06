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
      categories: [],
      newExpense: {
        description: '',
        amount: '',
        date: '',
        category: 'test'
      }
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => ({
      newExpense: {...prevState.newExpense, [name]: value}
    }))
  }
  async postNewExpense(url = '', data) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.postNewExpense((process.env.REACT_APP_API_SERVER + "/add-expense"),
      ({
        receipt_name: this.state.newExpense.description, 
        amount: parseFloat(this.state.newExpense.amount), 
        expense_date: this.state.newExpense.date,
        bucket_id: parseInt(this.state.newExpense.category)
      }))
    this.setState(prevState => ({
      newExpense: {
        description: '',
        amount: '',
        date: '',
        category: ''
      }
    }))
  }
  fetchCategories() {
    fetch(process.env.REACT_APP_API_SERVER + "/get-categories")
    .then(response => response.json())
    .then(data => {
        this.setState({ categories: data})
    })
  }
  renderCategories(categories) {
    return (
      <>
        <option value=''>Select a category</option>
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
    // MAYBE REMOVE THIS? ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // const receipt_image_box = (
    //   <>
    //     <div className="box__input">
    //       <input className="box__file" type="file" name="receipt" id="file" accept="image/*" />
    //       <label htmlFor="file"><strong>Choose a file</strong><span className="box__dragndrop"> or drag it here</span>.</label>
    //       <button className="box__button" type="submit">Upload</button>
    //     </div>
    //     <div className="box__uploading">Uploading&hellip;</div>
    //     <div className="box__success">Done!</div>
    //     <div className="box__error">Error! <span></span>.</div>
    //   </>
    // )
    
    return (
      <div>
        <form id="newExpenseForm" onSubmit={this.handleSubmit} className="go-bottom">
          <div className="form-input-container">
            <ReceiptUpload />
          </div>
          <div className="form-input-container">
            <input onChange={this.handleChange} id="description" name="description" type="text" value={this.state.newExpense.description} required/>
            <label>Expense Description</label>
          </div>
          <div className="form-input-container">
            <input onChange={this.handleChange} id="amount" name="amount" type="text" value={this.state.newExpense.amount} required/>
            <label>Expense Amount</label>
          </div>
          <div className="form-date form-input-container">
            <input onChange={this.handleChange} id="date" name="date" type="date" value={this.state.newExpense.date} required/>
            <label>Expense Date</label>
          </div>
          <div className="category-container">
            <div className="form-input-container form-select-container">
              <select value={this.state.newExpense.category} onChange={this.handleChange} id="category" name="category">
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
