require('dotenv').config();
var massive = require('massive');
module.exports = massive.connectSync({connectionString: process.env.CONNECTION});
