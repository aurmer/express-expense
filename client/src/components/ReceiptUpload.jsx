import React from 'react'
import { connect } from 'react-redux'
import AspectRatioBox from './AspectRatioBox'
import { useDropzone } from 'react-dropzone'
import { receiptLoaded } from '../redux/actions'

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png"
]

const KiB = 1024
const MiB = KiB*1024
const MAX_FILE_SIZE = 20*MiB


function isDragAndDrop() {
  const div = document.createElement('div')
  return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)
}

function isFormData() {
  return ('FormData' in window)
}

function isFileReader() {
  return ('FileReader' in window)
}

function isAdvancedUpload() {
  return (isDragAndDrop() && isFormData() && isFileReader())
}

function generateFormClassNames() {

  if(isAdvancedUpload()) {
    return "go-bottom has-advanced-upload"
  } else {
    return "go-bottom"
  }
}

function takeoverEvent(e) {
  e.preventDefault()
  e.stopPropagation()
}

function onDrop(e) {
  if(e[0]) {
    const myImg = document.getElementById('receiptImg')
    myImg.src = URL.createObjectURL(e[0])
    myImg.style.display = "block"
    document.getElementById('ahs-ar-box').style.display = "none"
  }
}

function onDropRejected(e) {
  console.dir(e)
  const rejectedFile = e[0]
  if(rejectedFile) {
    if(ALLOWED_FILE_TYPES.includes(rejectedFile.type) === false) {
      alert('your file must be a supported image')
    }
    else if(rejectedFile.size > MAX_FILE_SIZE) {
      alert('your file is too large. 3MiB limit.')
    }
  }
}

const ReceiptUpload = () => {
  // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    allow: ALLOWED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    onDrop: onDrop,
    onDrag: null,
    noDragEventsBubbling: true,
    onDragEnter: null,
    onDragLeave: null,
    onDragOver: null,
    onDropAccepted: null,
    onDropRejected: onDropRejected,
    onFileDialogCancel: null,
    preventDropOnDocument: true,
    multiple: false
  })

  return (
    <>
      <img alt="receipt" id="receiptImg" style={{display:"none"}}/>
      <AspectRatioBox id="ahs-ar-box" width="200px" heightPercent="120%">
        <div className="ahs-dropzone" {...getRootProps()}>
          <input className="dropzone-input" {...getInputProps()} />
          <div className="text-center">
            {isDragActive ? (
              <p className="dropzone-content">Release to drop the files here</p>
            ) : (
              <p className="dropzone-content">
                Drag 'n' drop some files here, or click to select files
              </p>
            )}
          </div>
        </div>
      </AspectRatioBox>
    </>
  )
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(
  mapStateToProps,
  { receiptLoaded }
)(ReceiptUpload)
