const tf = require("@tensorflow/tfjs-node");

async function predict(data) {
    const model = await tf.loadLayersModel("file://./mymodel/model.json");
    const ytensor = model.predict(tf.tensor(data)).flatten();
    const ypred = await ytensor.array();
    console.log(ypred);
}

predict([[77, 77, 80, 74]]);
