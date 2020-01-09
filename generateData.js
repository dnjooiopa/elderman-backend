const fs = require("fs");
const { parse } = require("json2csv");

function createCSV() {
    myData = [];
    for (let i = 0; i < 50; i++) {
        const row = {
            mac_addr: "80:E1:25:00:D9:D7",
            feature: [
                Math.floor(71 + Math.random() * 20),
                Math.floor(71 + Math.random() * 20),
                Math.floor(71 + Math.random() * 20),
                Math.floor(46 + Math.random() * 25)
            ],
            team: 29,
            label: [0, 0, 0, 1]
        };
        myData.push(row);
    }

    const fields = ["mac_addr", "feature", "team", "label"];
    const opts = { fields };

    try {
        const csv = parse(myData, opts);
        return csv;
    } catch (err) {
        console.error(err);
        return null;
    }
}

function saveCSV(csv) {
    fs.writeFile("./dataset3.csv", csv, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

csv = createCSV();
saveCSV(csv);
