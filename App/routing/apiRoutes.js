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
    loadProfiles(res);
  });
  app.post("/api/friends", function(req, res) {
    findMatch();
  });
};

function loadProfiles(response) {
  connection.query("SELECT * FROM profiles", function(err, result) {
    if (err) throw err;
    friends = result;
    return response.json(friends);
  });
}
function findMatch() {
  var bestMatch = {
    name: "",
    photo: "url",
    friendDifference: 1000
  };
  console.log(req.body);

  var userData = req.body;
  var userScores = userData.scores;
  console.log(userScores);
  var totalDifference = 0;

  for (var i = 0; i < friends.length; i++) {
    console.log(friends[i]);
    totalDifference = 0;
    for (var j = 0; j < friends[i].scores[j]; j++) {
      totalDifference += Math.abs(
        parseInt(userScores[j]) - parseInt(friends[i].score[j])
      );
      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    friends.push(userData);
    res.json(bestMatch);
    console.log(bestMatch);
  }
}
