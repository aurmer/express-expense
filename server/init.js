const fs = require('fs')

fs.mkdir(__dirname + '/public/uploaded-content/uploaded-receipts', { recursive: true }, (err) => {
  if (err) throw err;
	console.log("Path: \"" + __dirname + '/public/uploaded-content/uploaded-receipts" is confirmed' )
});
