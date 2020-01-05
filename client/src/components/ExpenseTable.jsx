import React from 'react'
// import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table'
// import Accordion from 'react-bootstrap/Accordion'
// import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'

import ReceiptModal from './ReceiptModal'

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isFetching: false,
        expenses: []
    };
  }
  fetchExpenses() {
    fetch(process.env.REACT_APP_API_SERVER + "/get-expenses/" + process.env.REACT_APP_TEST_USER_PROVIDERID)
      .then(response => response.json())
      .then(data => {
        this.setState({ expenses: data})
      })
  }
  renderTable(expenses, status) {
    let statusSortedExpenses = expenses.reduce((result, expense) => {
      if (expense.status === status) {
        result.push(expense)
      }
      return result
    }, [])
    return (
      <tbody>
        {statusSortedExpenses.map((expense, index) => (
          <tr key={index}>
          <td>
            {expense.bucket_name}
          </td>
          <td>
            {expense.expense_date}<br/>
            {expense.receipt_name}
          </td>
          <td>
            {expense.amount}
          </td>
          <td>
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                variant="secondary"
              >
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <ReceiptModal/>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Edit
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Toggle>
            </Dropdown>
          </td>
        </tr>
        ))}
      </tbody>
    )
  }
  componentDidMount() {
    this.fetchExpenses()
  }
  render() {
    return (
      <div id="expenseTable">
        <h3>Not Submitted</h3>
        <Table
          bordered
          hover
          size="sm"
        >
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
            {this.renderTable(this.state.expenses, "Not submitted")}
        </Table>
        <h3>Pending</h3>
        <Table
          bordered
          hover
          size="sm"
        >
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
            {this.renderTable(this.state.expenses, "Pending")}
        </Table>
        <h3>Paid</h3>
        <Table
          bordered
          hover
          size="sm"
        >
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
            {this.renderTable(this.state.expenses, "Paid")}
        </Table>
      </div>
    )
  } 
}

export default ExpenseTable