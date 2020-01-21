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
        expensesToReport: [],
        expensesPaid: []
    };
  }
  deepCopy (oldObject) {
    return JSON.parse(JSON.stringify(oldObject))
  }
  fetchExpenses = () => {
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
    console.log(response)
    return response
  }
  async postExpensesAsPaid(url = '', data) {
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
  async postDeleteExpense(url = '', data = {}) {
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
    // console.log('checked', checked)
    this.setState({ expensesToReport: checked })
  }
  handleGenerateReport = (e) => {
    e.preventDefault()
    this.postExpensesToGenerateReport("/generate-report", this.state.expensesToReport)
    .then(this.fetchExpenses)
  }
  handleCheckboxesToMarkAsPaid = (e) => {
    const checked = this.state.expensesPaid
    let index

    if (e.target.checked) {
      checked.push(parseInt(e.target.value))
    } else {
      index = checked.indexOf(parseInt(e.target.value))
      checked.splice(index, 1)
    }
    // console.log('checked', checked)
    this.setState({ expensesPaid: checked })
  }
  handleMarkAsPaid = (e) => {
    e.preventDefault()
    this.postExpensesAsPaid("/mark-as-paid", this.state.expensesPaid)
    .then(this.fetchExpenses)
  }
  deleteExpense = (expenseId, index) => {
    // console.log('clicked delete expense id ' + expenseId + ' index ' + index)
    this.postDeleteExpense("/delete-expense", {id: expenseId})
    // console.log('expenses state ', this.state.expenses)
    let recordsState = this.deepCopy(this.state.expenses)
    recordsState.splice(index, 1)
    this.setState({ expenses: recordsState })
  }
  renderTable(expenses, status) {
    let checkboxName = "expenseToReport"
    let onChangeFunction = this.handleCheckboxesToReport
    let checkboxDisplayStyle = {display: "block"}
    let statusSortedExpenses = expenses.reduce((result, expense) => {
      if (expense.status === status) {
        result.push(expense)
      }
      return result
    }, [])
    if (status === "Pending") {
      checkboxName = "expenseToMarkAsPaid"
      onChangeFunction = this.handleCheckboxesToMarkAsPaid
    }
    if (status === "Paid") {
      checkboxDisplayStyle = {display: "none"}
      checkboxName = ""
      onChangeFunction = null
    }
    return (
      <tbody>
        {statusSortedExpenses.map((expense, index) => (
          <tr key={index}>
          <td>
            {expense.bucket_name}
            <input type="checkbox" style={checkboxDisplayStyle} name={checkboxName} value={expense.id} onChange={onChangeFunction}></input>
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
                    <ReceiptModal receiptLink={expense.receipt_img_path}/>
                  </Dropdown.Item>
                  {/* <Dropdown.Item>
                    Edit
                  </Dropdown.Item> */}
                  <Dropdown.Item onClick={() => (this.deleteExpense(expense.id, index))}>
                    Delete
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
            <Button type="submit">Generate Report</Button>
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
        <form onSubmit={this.handleMarkAsPaid}>
          <div className="table-header">
            <h3>Pending</h3>
            <Button type="submit">Mark As Paid</Button>
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
              {this.renderTable(this.state.expenses, "Pending")}
          </Table>
        </form>
        <div className="table-header">
          <h3>Paid</h3>
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
            {this.renderTable(this.state.expenses, "Paid")}
        </Table>
      </div>
    )
  }
}

export default ExpenseTable
