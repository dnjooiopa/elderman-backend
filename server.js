const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const predict = require("./inference");

app.get("/", function(req, res) {
    res.send("<h1>Hello</h1>");
});

app.get("/train", function(req, res) {
    res.send("<h1>train</h1>");
});

app.post("/predict", async function(req, res) {
    const data = req.body.data;
    const ypred = await predict(data);
    const imax = ypred.indexOf(Math.max(...ypred))+1 // position of team;
    res.json(imax);
});

app.listen(8888, function() {
    console.log("server started at port 8888");
});
