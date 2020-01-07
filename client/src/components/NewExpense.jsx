import React from 'react'
import { connect } from 'react-redux'
import { receiptLoaded } from '../redux/actions'
import { oneDepthObjectEqual } from '../util-functions'

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
    const { imgFile, ...textFields } = data
    const new_img_filename = `${textFields.expense_date} ${textFields.user_id}.${imgFile.name.split('.').pop()}`
    textFields.receipt_img_path = `public/uploaded-content/uploaded-receipts/${new_img_filename}`
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(textFields)
    })
    const img_response = await fetch('/upload-img', { // Your POST endpoint
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: imgFile // This is your file object
      })
    return response
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.postNewExpense(("/add-expense"),
      ({
        receipt_name: this.state.newExpense.description,
        amount: parseFloat(this.state.newExpense.amount),
        expense_date: this.state.newExpense.date,
        bucket_id: parseInt(this.state.newExpense.category),
        imgFile: e.target.elements[0].files[0]
      }))
    this.setState(prevState => ({
      newExpense: {
        description: '',
        amount: '',
        date: '',
        category: '',
        img: '',
      }
    }))
    window.location.href='/dashboard'
  }

  shouldUpdateCategories(data) {
    if(oneDepthObjectEqual(data,this.state.categories)) {
      return false
    } else {
      return true
    }
  }

  fetchCategories = () => {
    fetch("/get-categories")
    .then(response => response.json())
    .then(data => {
        if(this.shouldUpdateCategories(data))
        {
          this.setState({ categories: data})
        }
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

  componentDidUpdate() {
    this.fetchCategories()
  }



  render() {

    return (
      <div>
        <form id="newExpenseForm" action="/add-expense" onSubmit={this.handleSubmit} className="go-bottom">
          <div className="form-input-container">
            <ReceiptUpload hackForce={Math.random()} />
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
              <NewCategoryModal fetchCategories={this.fetchCategories}/>
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
