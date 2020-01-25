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
        category: '',
        img: '',
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
      body: data
    })

    return response
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const newExpenseForm = document.getElementById('newExpenseForm')
    this.postNewExpense(("/add-expense"), new FormData(newExpenseForm)
    )
    this.setState(prevState => ({
      newExpense: {
        description: '',
        amount: '',
        date: '',
        category: '',
        img: ''
      }
    }))
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

  addImage = (imageURLObj) => {
    this.setState(
      {newExpense: {
        ...this.state.newExpense,
        img:imageURLObj
      }})
  }

  render() {

    return (
      <div>
        <form id="newExpenseForm" action="/add-expense" onSubmit={this.handleSubmit} className="go-bottom">
          <div className="form-input-container">
            <ReceiptUpload image={this.state.newExpense.img} addImage={this.addImage} />
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
