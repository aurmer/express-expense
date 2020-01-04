import React from 'react'
import { connect } from 'react-redux'

const AspectRatioBox = (props) => {

  const {width, heightPercent, ...propsExlcudingWidth} = props

  const OUTER_STYLES = {
    height: '0',
    overflow: 'hidden',
    paddingTop: heightPercent,
    position: 'relative'
  }

  const INNER_STYLES = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%'
  }

  return (
    <div style={{width,margin:"auto"}}>
      <div {...propsExlcudingWidth} style={OUTER_STYLES}>
        <div style={INNER_STYLES}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(
  mapStateToProps,
  {  }
)(AspectRatioBox)
