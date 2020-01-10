const fetch = require("node-fetch");
const fs = require("fs");
const { parse } = require("json2csv");
// tgr32 => team32
// tgr7 => team14
// tgr6 => team11
// tgr29 => team29

const team = {
    tgr32: "team32",
    tgr7: "team14",
    tgr6: "team11",
    tgr29: "team29"
};

const numTeam = [32, 14, 11, 29];

function processData(json) {
    const tempData = { team32: [], team14: [], team11: [], team29: [] };
    const length = Object.keys(json).length;
    const skip = length / 4;
    for (let i in Object.keys(json)) {
        const obj = json[i];
        //console.log(obj["sensor_id"]);
        const k = team[obj["sensor_id"]];
        const rssi = -obj["rssi"];
        if (k) tempData[k].push(rssi);
    }
    let min = 10000;
    for (let i in tempData) {
        if (min > tempData[i].length) {
            min = tempData[i].length;
        }
    }

    let csvJson = [];
    for (let i = 0; i < min; i++) {
        const feat = [
            tempData.team32[i],
            tempData.team14[i],
            tempData.team11[i],
            tempData.team29[i]
        ];
        let label = [0, 0, 0, 0];
        let index = feat.indexOf(Math.min(...feat));
        label[index] = 1;
        const row = {
            feature: feat,
            team: numTeam[index],
            label: label
        };
        csvJson.push(row);
    }

    return csvJson;
}

function createCSV(myData) {
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
    fs.writeFile("./data_get.csv", csv, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

async function getData() {
    const data = await fetch(
        "http://202.139.192.221/api/track_data/myrssi?skip=0&limit=10000&sort=-1"
    ).then(res => res.json());
    const csvJson = await processData(data);
    return csvJson;
}

async function run() {
    const csvJson = await getData();
    const csv = await createCSV(csvJson);
    saveCSV(csv);
}

run();
