
//document.getElementById('form').addEventListener('submit', getFileData);

// function getFileData(e) {
//   e.preventDefault();
//   let textArea = document.getElementById('text').value;
//   sendData(textArea);
// }

// function sendData(data) {
//   console.log('sending data!');
//   return fetch('/upload_json', {
//     method: 'POST',
//     mode: 'cors',
//     headers: {
//       contentType: 'application/json'
//     },
//     body: data
//   })
//   .then(function(data) {
//     console.log('DATA TEXT', data.text());
//     return data.text();
//   })
//   .catch(function(err) {
//     console.log('Failed to send JSON', err);
//     displayFail();
//   })
//   .then(function(text) {
//     console.log('Succeeded in sending JSON');
//     display(text);
//   });
// }

// function display(data) {
//   document.getElementById('data').innerHTML = '' + data;
// }

// function displayFail() {
//   document.getElementById('data').innerHTML = "Data error";
// }
