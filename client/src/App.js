import React from 'react'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import AppNavbar from './components/AppNavbar'
import NewExpense from './components/NewExpense'
import Dashboard from './components/Dashboard'
import PageNotFound from './components/PageNotFound'

require('dotenv').config();

function App() {
  return (
    <div>
      <Router>
        <AppNavbar/>
        <div className="container">
          <Switch>
            <Route path="/new-expense/">
              <NewExpense/>
            </Route>
            <Route path="/dashboard">
              <Dashboard/>
            </Route>
            <Route path="/about">
              <h1>About</h1>
            </Route>
            <Route exact path="/logout" render={() => {window.location.href="/logout"}} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
