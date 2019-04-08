var mysql = require("mysql");
//THIS IS JUST LOCAL CONNECTION. NEED TO FOLLOW HEROKU/MY SQL INTERFACE
var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "friendfinder_db"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    // Selects all of the data from the MySQL profiles table
    connection.query("SELECT * FROM profiles", function(err, response) {
      if (err) throw err;
      //a fun trick for converting mysql's returned 'rowPacketData' obj into more usable JSON
      var data = JSON.stringify(response);
      data = JSON.parse(data);
      // loop over your data converting the string of numbers into an array (using split??)
      friends = data;
      res.json(friends);
    });
  });
};
