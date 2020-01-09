import React from 'react'
import { connect } from 'react-redux'
import { replaceThisAction } from '../redux/actions'

const EXAMPLE = (props) => {

    return (
      <>
      </>
    )
  }

function mapStateToProps(state) {
  return {

  }
}

export default connect(
  mapStateToProps,
  { replaceThisAction }
)(EXAMPLE)
