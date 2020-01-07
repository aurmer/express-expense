import React, { useState } from 'react'
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

const ReceiptUpload = (props) => {
    const [imageSubmitted, updateImageSubmitted] = useState(false)
    const handleSubmitImage = () => updateImageSubmitted(true)

    const [imageURLObj, updateImageURLObj] = useState("")
    const handleImageURLObj = (ob) => updateImageURLObj(ob)

    // Initializing useDropzone hooks with options
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      allow: ALLOWED_FILE_TYPES,
      maxSize: MAX_FILE_SIZE,
      onDrop: (e) => {
        if(e[0]) {
          const myImg = document.getElementById('receiptImg')
          handleSubmitImage(true)
          handleImageURLObj(URL.createObjectURL(e[0]))
        }
      },
      onDrag: null,
      noDragEventsBubbling: true,
      onDragEnter: null,
      onDragLeave: null,
      onDragOver: null,
      onDropAccepted: null,
      onDropRejected: (e) => {
        const rejectedFile = e[0]
        if(rejectedFile) {
          if(ALLOWED_FILE_TYPES.includes(rejectedFile.type) === false) {
            alert('your file must be a supported image')
          }
          else if(rejectedFile.size > MAX_FILE_SIZE) {
            alert('your file is too large. 20MiB limit.')
          }
        }
      },
      onFileDialogCancel: null,
      preventDropOnDocument: true,
      multiple: false
    })

    let imgTagStyles, dropzoneShow
    if(imageSubmitted) {
      imgTagStyles = {
        display:"block"
      }
      dropzoneShow = false
    } else {
      imgTagStyles = {
        display:"none"
      }
      dropzoneShow = true
    }

    return (
      <>
        <img alt="receipt" id="receiptImg" src={imageURLObj} style={imgTagStyles}/>
        <AspectRatioBox id="ahs-ar-box" width="200px" heightPercent="120%" show={dropzoneShow} >
          <div className="ahs-dropzone" {...getRootProps()}>
            <input className="dropzone-input"  {...getInputProps()} />
            <div className="text-center">
              {isDragActive ? (
                <p className="dropzone-content">Release to drop the file.</p>
              ) : (
                <p className="dropzone-content">
                  Drop image here or click to select file.
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
