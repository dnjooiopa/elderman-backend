const fs = require("fs");
const { parse } = require("json2csv");

function createCSV() {
    myData = [];
    for (let i = 0; i < 50; i++) {
        const row = {
            feature: [
                Math.floor(71 + Math.random() * 20),
                Math.floor(71 + Math.random() * 20),
                Math.floor(44 + Math.random() * 25),
                Math.floor(71 + Math.random() * 20)
            ],
            team: 11,
            label: [0, 0, 1, 0]
        };
        myData.push(row);
    }

    const fields = ["feature", "team", "label"];
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
    fs.writeFile("./data4.csv", csv, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

csv = createCSV();
saveCSV(csv);
