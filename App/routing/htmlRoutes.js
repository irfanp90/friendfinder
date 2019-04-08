//  the path package  gets the correct file path for our html
var path = require("path");

// Below code handles when users visit  a page.
// In each of the below cases the user is shown an HTML page of content
module.exports = function(app) {
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};
