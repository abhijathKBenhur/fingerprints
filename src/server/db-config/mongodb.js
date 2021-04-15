const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/fingerprints", {
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

