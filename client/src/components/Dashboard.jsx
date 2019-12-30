import React from 'react'
import { connect } from 'react-redux'

import Table from 'react-bootstrap/Table'
import ReceiptImage from '../img/receipt.svg'

const fakeExpenseItemsTable = [
  {
    receipt_name: 'Bahn Mi for Flex Class',
    transaction_detail: 'Purchased Bahn Mi for Saturday Class.',
    amount: 200.0,
    expense_date: '12/21/19',
    tags: 'Food',
  }
]
const fakeUserTable = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'John.Doe@Gmail.com',
    token: 'test',
  }
const fakeBucketsTable = [
  {
    bucket_name: 'DigitalCrafts Expenses',
    total_number_of_expenses: 1,
  }
]

class Dashboard extends React.Component {
  // THIS FUNCTION TO BE REPLACED WITH CALL TO DB
  generateFakeTableRows() {
    let fakeTableRows = []
    for (let index = 0; index < 10; index++) {
      console.log(index)
      fakeTableRows.push({
        category: fakeBucketsTable[0].bucket_name,
        description: fakeExpenseItemsTable[0].receipt_name,
        amount: fakeExpenseItemsTable[0].amount,
        date: fakeExpenseItemsTable[0].expense_date
      })
    }
    return (
      <tbody>
        {fakeTableRows.map((expense, index) => (
          <tr key={index}>
            <td>
              {expense.category}
            </td>
            <td>
              {expense.description}
            </td>
            <td>
              {expense.amount}
              <a href="#">
                <img className="receipt-image" alt="receipt image" src={ReceiptImage}></img>
              </a>
            </td>
            <td>
              {expense.date}
            </td>
          </tr>
        ))}
      </tbody>
    )
  }
  render() {
    return (
      <div className="container">
        <h1>Hi, {fakeUserTable.first_name}!</h1>
        <Table
          bordered
          striped
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
            {this.generateFakeTableRows()}
        </Table>
      </div>
    )
  } 
}

export default Dashboard