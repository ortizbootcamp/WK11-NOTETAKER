const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

require("/Develop/api.js")(app);
require("/Develop/html.js")(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname + "/Develop/public")));

app.listen(PORT, function() {
    console.log("Listening on port..." + PORT);
});

