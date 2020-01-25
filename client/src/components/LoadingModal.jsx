import React from 'react'
import { Modal,Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { nextLoadingModalRender } from '../redux/actions'




const EXAMPLE = (props) => {

  const oneTwoThreeArray = [1,2,3]
  const animatedDots = oneTwoThreeArray.map((value) =>
    if(value === props.count) {
      return <Spinner animation="grow" variant="secondary" onAnimationIteration={nextLoadingModalRender}/>
    } else {
      return <div style={{height:"32px",width:"32px"}}/>
    }
  )

  return (
    <Modal>
      Loading
      <div style={{display:"flex"}}
        {animatedDots}
      </div>
    </Modal>
  )
}

function mapStateToProps(state) {
  return {
    count: state.loadingModal.count
  }
}

export default connect(
  mapStateToProps,
  { nextLoadingModalRender }
)(EXAMPLE)
