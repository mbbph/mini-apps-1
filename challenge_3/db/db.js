const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


const checkoutSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
    ccn: String,
    expire: String,
    billing: String
});

module.exports = mongoose.model('checkoutSchema', checkoutSchema);
