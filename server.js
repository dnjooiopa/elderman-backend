const express = require("express");
const app = express();
const getFirebase = require("./train");

app.get("/", function(req, res) {
    res.send("<h1>Hello</h1>");
});

app.get("/train", function(req, res) {
    getFirebase();
    res.send("<h1>train</h1>");
});

app.listen(8888, function() {
    console.log("server started at port 8888");
});
