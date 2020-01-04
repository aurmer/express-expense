import React from 'react'

import ExpenseTable from './ExpenseTable'

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      greeting: ""
    }
  }
  fetchUserName() {
    fetch(process.env.REACT_APP_API_SERVER + "/get-user/" + process.env.REACT_APP_TEST_USER_TOKEN)
      .then(response => response.json())
      .then(data => {
        this.setState({ greeting: "Hello, " + data[0].first_name + "!" })
      })
  }
  componentDidMount() {
    this.fetchUserName()
  }
  
  render() {
    return (
      <div>
        <h1>{this.state.greeting}</h1>
        
        <ExpenseTable/>
      </div>
    )
  }
}

export default Dashboard