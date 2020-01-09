const { parse } = require("json2csv");
const fs = require("fs");
const fetch = require("node-fetch");

// const { parse } = require("json2csv");

// const team = {
//     "80:E1:26:00:5F:6A": ["team32",0],
//     "80:E1:26:07:D6:C2": ["team14",1],
//     "80:E1:26:07:CD:59": ["team11",2],
//     "80:E1:25:00:D9:D7": ["team29",3]
// };

const team = {
    32: 0,
    14: 1,
    11: 2,
    29: 3
};

function saveCSV(csv) {
    fs.writeFile("./data.csv", csv, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

// function jsonToCSV(json) {
//     myData = [];

//     for (let i in json) {
//         let lab =[0,0,0,0]
//         lab[team[json[i].mac_addr][1]] = 1
//         const row = {
//             mac_addr: json[i].mac_addr,
//             rssi: json[i].rssi,
//             team: team[json[i].mac_addr][0],
//             label: lab
//         };
//         myData.push(row);
//     }

//     const fields = ["mac_addr", "rssi", "team", "label"];
//     const opts = { fields };

//     try {
//         const csv = parse(myData, opts);
//         return csv;
//     } catch (err) {
//         console.error(err);
//         return null;
//     }
// }

async function processData(json) {
    let data = { team32: [], team14: [], team11: [], team29: [] };
    for (let i in json) {
        let numTeam = json[i]["team"];
        let team = "team" + String(numTeam);
        let rssi = json[i]["rssi"];
        data[team].push(rssi);
    }
    return data;
}

function jsonToCSV(json) {
    let myData = [];

    for (let i in json) {
        let lab = [0, 0, 0, 0];
        lab[team[json[i].team]] = 1;
        const row = {
            mac_addr: json[i].mac_addr,
            rssi: json[i].rssi,
            feature: [json[i].rssi],
            team: json[i].team,
            label: lab
        };
        myData.push(row);
    }

    const fields = ["mac_addr", "feature" ,"team", "label"];
    const opts = { fields };

    try {
        const csv = parse(myData, opts);
        return csv;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function getFirebase() {
    const [data, csv] = await fetch("https://tesa-be0e8.firebaseio.com/rssi.json")
        .then(res => res.json()) // expecting a json response
        .then(json => [processData(json), jsonToCSV(json)]);
    console.log(csv);
    await saveCSV(csv)
}

module.exports = getFirebase;
