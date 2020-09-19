const express = require('express')
const app = express()
app.use(express.static('client'))
app.use(express.json());

app.get('/upload_json', (req, res) => {
  res.end('get req end');
})

app.post('/upload_json', (req, res) => {
  console.log('YO!');
  res.end('post req end');
})



//verify that form input is valid
function verifyJSON(data) {
  try {
    JSON.parse(data);
  } catch(e) {
    return false;
  }
}

//get columns
var columns = [];
function getColumns(data) {
  for (var key in data) {
    if (key != 'children' && columns.indexOf(key) === -1) {
      columns.push(key);
    }
  }
  if (data.children && data.children.length > 0) {
    for (var i = 0; i < data.children.length; i++) {
      getColumns(data.children[i]);
    }
  }
}

//convert column headers to csv
function columnsToCsv(data) {
  getColumns(data);
  var header = columns.join() + '\n';
  return header;
}

//convert rest of file
function jsonToCsv(data) {
  var csv = '';
  for (var i = 0; i < columns.length; i++) {
    if (i === columns.length - 1) {
      if (typeof data[columns[i]] === 'undefined') {
        csv = csv + ' ' + '\n';
      } else {
        csv = csv + data[columns[i]] + '\n';
      }
    } else if (typeof data[columns[i]] === 'undefined') {
      csv = csv + ' ' + ',';
    } else {
      csv = csv + data[columns[i]] + ',';
    }
  }

  if (data.children.length > 0) {
    for (let i = 0; i < data.children.length; i++) {
      csv += jsonToCsv(data.children[i]);
    }
  }

  return csv;

}






app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
})
