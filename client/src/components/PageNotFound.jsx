import React from 'react'

const PageNotFound = ({ location }) => (
    <div>
        <h1>404 Error:</h1>
      <h3> Page not found at: <code>{location.pathname}</code></h3>
    </div>
)

  export default PageNotFound