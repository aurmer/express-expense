import React from 'react'
// import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

import ReceiptModal from './ReceiptModal'

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
    fetch(process.env.REACT_APP_API_SERVER + "/get-user/" + process.env.REACT_APP_TEST_USER_TOKEN)
      .then(response => response.json())
      .then(data => {
        this.setState({ greeting: "Hello, " + data[0].first_name + "!" })
      })
  }
  fetchExpenses() {
    fetch(process.env.REACT_APP_API_SERVER + "/get-expenses/" + process.env.REACT_APP_TEST_USER_ID)
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
            {expense.receipt_name}
          </td>
          <td>
            {expense.amount}
            <ReceiptModal/>
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
      <div>
        <h1>{this.state.greeting}</h1>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle className="not-submitted-header" as={Card.Header} eventKey="0">
              Not Submitted
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Table
                  bordered
                  hover
                  size="sm"
                >
                  <thead className="not-submitted-header">
                    <tr>
                      <th style={{witdh: "16.66%"}}>Category</th>
                      <th style={{witdh: "25%"}}>Description</th>
                      <th style={{witdh: "50%"}}>Amount</th>
                      <th style={{witdh: "8.33%"}}>Date</th>
                    </tr>
                  </thead>
                    {this.renderTable(this.state.expenses, "Not submitted")}
                </Table>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion>
          <Card>
            <Accordion.Toggle className="pending-header" as={Card.Header} eventKey="1">
              Pending
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Table
                bordered
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
                  {this.renderTable(this.state.expenses, "Pending")}
              </Table>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion>
          <Card>
            <Accordion.Toggle className="paid-header" as={Card.Header} eventKey="2">
              Paid
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Table
                bordered
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
                  {this.renderTable(this.state.expenses, "Paid")}
              </Table>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  } 
}

export default Dashboard