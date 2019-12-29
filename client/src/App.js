import React from 'react'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import AppNavbar from './components/AppNavbar'
import Login from './components/Login'
import NewExpense from './components/NewExpense'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div>
      <Router>
        <AppNavbar/>
        <div className="container">
          <Switch>
            <Route path="/new-expense">
              <NewExpense/>
            </Route>
            <Route path="/dashboard">
              <Dashboard/>
            </Route>
            <Route path="/settings">
              <h1>Settings</h1>
            </Route>
            <Route path="/about">
              <h1>About</h1>
            </Route>
            <Route path="/">
              <Login/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
