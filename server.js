// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Setup Express
let app = express();
let PORT = process.env.PORT || 3000;

// Express data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var friends = require("./app/data/friends.js")

require("./app/routing/htmlRoutes.js")(app, path);
require("./app/routing/apiRoutes.js")(app, friends);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});