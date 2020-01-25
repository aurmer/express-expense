import React from 'react'

import ExpenseTable from './ExpenseTable'
import ReceiptModal from './ReceiptModal'

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      greeting: "",
      showReceiptModal: false,
      receiptModalSrcLink: ""
    }
  }
  fetchUserName() {
    fetch("/get-user")
      .then(response => response.json())
      .then(data => {
        this.setState({ greeting: "Hello, " + data[0].first_name + "!" })
      })
  }
  componentDidMount() {
    this.fetchUserName()
  }

  handleReceiptModalHide = () => {
    this.setState({
      showReceiptModal: false,
      receiptModalSrcLink: ""
    })
  }

  handleShowReceiptModal = (receiptLink) => {
      this.setState({
        showReceiptModal: true,
        receiptModalSrcLink: receiptLink
      })
  }

  render() {
    return (
      <div>
        <h1>{this.state.greeting}</h1>
        {
          this.state.showReceiptModal &&
          <ReceiptModal show={true} hideModalCallback={this.handleReceiptModalHide} receiptLink={this.state.receiptModalSrcLink}/>
        }
        <ExpenseTable showReceiptModal={this.handleShowReceiptModal} />
      </div>
    )
  }
}

export default Dashboard
