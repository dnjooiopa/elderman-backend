const tf = require("@tensorflow/tfjs-node");
const csvtojson = require("csvtojson");

function createModel() {
    const model = tf.sequential();
    model.add(
        tf.layers.dense({
            units: 64,
            inputShape: 4,
            activation: "sigmoid"
        })
    );
    model.add(
        tf.layers.dense({
            units: 64,
            activation: "relu"
        })
    );
    model.add(
        tf.layers.dense({
            units: 4,
            activation: "softmax"
        })
    );

    model.compile({
        optimizer: tf.train.adam(),
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"]
    });
    return model;
}

function str2array(s) {
    d = s.replace("[", "");
    d = d.replace("]", "");
    d = d.split(",");
    temp = d.map(e => Number(e));
    return temp;
}

function processData(rawData) {
    let xs = [];
    let ys = [];
    rawData.map(e => {
        xs.push(str2array(e.feature));
        ys.push(str2array(e.label));
    });

    return [xs, ys];
}

const saveModel = async model => {
    try {
        await model.save("file://./mymodel");
    } catch (error) {
        // Handle the error in here
        console.log(error);
    }
};

async function run() {
    const rawData = await csvtojson().fromFile("data.csv");
    const [xs, ys] = processData(rawData);
    const model = await createModel();
    const h = await model.fit(tf.tensor(xs), tf.tensor(ys), {
        epochs: 20
    });
    xv = [[86, 85, 77, 88]];
    const yv = await model.predict(tf.tensor(xv));
    yv.print();
    await saveModel(model);
}

run();
