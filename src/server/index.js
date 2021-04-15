const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");

const tokenAPI = require('./routes/TokenAPIs')

const app = express();
const PORT = 4000;


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())



app.use('/api', tokenAPI)


app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

