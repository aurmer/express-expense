import React from 'react'
// import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import ReceiptImage from '../img/receipt.svg'
// import moreImage from '../img/more.svg'

// const fakeExpenseItemsTable = [
//   {
//     receipt_name: 'Bahn Mi for Flex Class',
//     transaction_detail: 'Purchased Bahn Mi for Saturday Class.',
//     amount: 200.0,
//     expense_date: '12/21/19',
//     tags: 'Food',
//     status: 'Not submitted',
//     bucket_id: 1
//   }, {
//     receipt_name: 'Energy Drinks',
//     amount: 79,
//     expense_date: '10/19/19',
//     tags: 'Food',
//     status: 'Paid',
//     bucket_id: 1
//   }, {
//     receipt_name: 'Lunch with client',
//     amount: 34,
//     expense_date: '11/23/19',
//     tags: 'Food',
//     status: 'Pending',
//     bucket_id: 2
//   }, {
//     receipt_name: 'Tacos for demo day',
//     amount: 121,
//     expense_date: '12/13/19',
//     tags: 'Food',
//     status: 'Pending',
//     bucket_id: 1
//   }, {
//     receipt_name: 'Coffee for team',
//     amount: 17,
//     expense_date: '12/18/19',
//     tags: 'Food',
//     status: 'Not submitted',
//     bucket_id: 2
//   }
// ]
// const fakeUserTable = {
//     first_name: 'John',
//     last_name: 'Doe',
//     email: 'John.Doe@Gmail.com',
//     token: 'test',
//   }
// const fakeBucketsTable = [
//   {
//     id: 1,
//     bucket_name: 'DigitalCrafts',
//     total_number_of_expenses: 3,
//   }, {
//     id: 2,
//     bucket_name: 'Luminare', 
//     total_number_of_expenses: 2
//   }
// ]

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isFetching: false,
        greeting: "",
        expenses: []
    };
  }
  // THIS FUNCTION TO BE REPLACED WITH CALL TO DB
  // generateFakeTableRows() {
  //   let fakeTableRows = []
  //   for (let index = 0; index < 10; index++) {
  //     // console.log(index)
  //     fakeTableRows.push({
  //       category: fakeBucketsTable[0].bucket_name,
  //       description: fakeExpenseItemsTable[0].receipt_name,
  //       amount: fakeExpenseItemsTable[0].amount,
  //       date: fakeExpenseItemsTable[0].expense_date,
  //       status: fakeExpenseItemsTable[0].status
  //     })
  //   }
  //   return (
  //     <tbody>
  //       {fakeExpenseItemsTable.map((expense, index) => (
  //         <tr key={index}>
  //           <td>
  //             {expense.category}
  //           </td>
  //           <td>
  //             {expense.description}
  //           </td>
  //           <td>
  //             {expense.amount}
  //             <a href="#">
  //               <img className="receipt-image" alt="receipt image" src={ReceiptImage}></img>
  //             </a>
  //           </td>
  //           <td>
  //             {expense.date}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   )
  // }
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
    // this.fetchExpenses()
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