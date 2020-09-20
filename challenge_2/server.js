const express = require('express')
const app = express()
app.use(express.static('client'))
app.use(express.json());
app.use(express.urlencoded());
var columns = [];

app.get('/upload_json', (req, res) => {
  res.end();
})

app.post('/upload_json', (req, res) => {
  let data = req.body;

  //console.log('The data', data.text);
  if (verifyJSON(data.text) === false) {
    res.end('Cannot convert. Not a JSON file.');
  } else {
    res.set('Content-Type', 'text/html');
    result = '';
    let newdata = JSON.parse(data.text);
    result += columnsToCsv(newdata) + '\n';
    result += jsonToCsv(newdata);
    let newPage = generatePage(result);
    res.send(newPage);
  }

})

function generatePage(value) {
return `
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="styles.css">
    <title>CSV Report Generator</title>
  </head>
  <body>
    <form id='form' action="/upload_json" method="POST">
      <label for="filetext">Paste in data</label><br>
      <textarea id='text' style='width:600px;height:200px' name='text'></textarea><br>
      <input type="submit" value="Submit">
    </form>
    <div id="data">Result goes here</div>
    <div>${value}</div>
    <script src="app.js"></script>
  </body>
</html>
`;
}



// verify that form input is valid
function verifyJSON(data) {
  try {
    return JSON.parse(data);
  } catch(e) {
    return false;
  }
}

//get columns

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
