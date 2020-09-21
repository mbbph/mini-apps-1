const express = require('express')
const app = express()
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());
const mongoose = require('mongoose');
const mod = require('./db/db.js');

app.post('/checkout', function(req, res) {
  let instance = new mod(req.body);
  instance.save(function (err, data) {
    if (err) {
      res.send('Could not save data to database');
    } else {
      res.status(200);
      res.end();
    }
  })
  res.end();
})

app.get('/checkout', function(req, res) {
  res.end();
})

app.listen(3000, function() {
  console.log('listening on port 3000...');
})
