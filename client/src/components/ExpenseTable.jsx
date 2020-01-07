import React from 'react'
// import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table'
// import Accordion from 'react-bootstrap/Accordion'
// import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

import ReceiptModal from './ReceiptModal'

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isFetching: false,
        expenses: [],
        expensesToReport: []
    };
  }
  fetchExpenses() {
    fetch("/get-expenses")
      .then(response => response.json())
      .then(data => {
        this.setState({ expenses: data})
      })
  }
  async postExpensesToGenerateReport(url = '', data) {
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
  handleCheckboxesToReport = (e) => {
    const checked = this.state.expensesToReport
    let index

    if (e.target.checked) {
      checked.push(parseInt(e.target.value))
    } else {
      index = checked.indexOf(parseInt(e.target.value))
      checked.splice(index, 1)
    }
    console.log('checked', checked)
    this.setState({ expensesToReport: checked })
  }
  handleGenerateReport = (e) => {
    e.preventDefault()
    this.postExpensesToGenerateReport("/generate-report", this.state.expensesToReport)
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
            <input type="checkbox" name="reportedExpense" value={expense.id} onChange={this.handleCheckboxesToReport}></input>
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
        <form onSubmit={this.handleGenerateReport}>
          <div className="table-header">
            <h3>Not Submitted</h3>
            <Button type="submit" className="generate-report-btn">Generate Report</Button>
          </div>
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
        </form>
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
