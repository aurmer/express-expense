

const fileUploadCallback = (err) => {
	if(err) {
		console.log("file saving error: ",err)
	}
}

module.exports = {
  fileUploadCallback: fileUploadCallback
}
