import React from 'react'
// import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import ReceiptImage from '../img/receipt.svg'
// import moreImage from '../img/more.svg'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isFetching: false,
        greeting: "",
        expenses: []
    };
  }
  fetchUserName() {
    fetch(process.env.REACT_APP_API_SERVER + "/get-user")
      .then(response => response.json())
      .then(data => {
        this.setState({ greeting: "Hello, " + data.rows[0].first_name + "!" })
      })
  }
  fetchExpenses() {
    fetch(process.env.REACT_APP_API_SERVER + "/get-expenses" + process.env.REACT_APP_TEST_USER_ID)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ expenses: data})
      })
  }
  renderTable(expenseArray) {
    return (
      <tbody>
        {expenseArray.map((expense, index) => (
          <tr key={index}>
          <td>
            {expense.category}
          </td>
          <td>
            {expense.receipt_name}
          </td>
          <td>
            {expense.amount}
            <a href="#">
              <img className="receipt-image" alt="receipt image" src={ReceiptImage}></img>
            </a>
          </td>
          <td>
            {expense.expense_date}
          </td>
        </tr>
        ))}
      </tbody>
    )
  }
  componentDidMount() {
    this.fetchUserName()
    this.fetchExpenses()
  }
  render() {
    return (
      <div className="component-container">
        <h1 style={{height: "48px"}}>{this.state.greeting}</h1>
        <DropdownButton
          drop="right"
          variant="secondary"
          title="Select Status"
          id="dropdown-right"
          key="right"
        >
          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
          <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        </DropdownButton>
        <Accordion defaultActiveKey="0">
          <Card >
            <Accordion.Toggle className="not-submitted-header" as={Card.Header} eventKey="0">
              Not Submitted
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Table
                  bordered
                  striped
                  hover
                  size="sm"
                >
                  <thead className="not-submitted-header">
                    <tr>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                    {this.renderTable(this.state.expenses)}
                </Table>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle className="pending-header" as={Card.Header} eventKey="1">
              Pending
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Table
                bordered
                striped
                hover
                size="sm"
              >
                <thead className="pending-header">
                  <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                  {this.renderTable(this.state.expenses)}
              </Table>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle className="paid-header" as={Card.Header} eventKey="2">
              Paid
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Table
                bordered
                striped
                hover
                size="sm"
              >
                <thead className="paid-header">
                  <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                  {this.renderTable(this.state.expenses)}
              </Table>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  } 
}

export default Dashboard