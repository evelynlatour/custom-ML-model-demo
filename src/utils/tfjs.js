import * as tf from "@tensorflow/tfjs";

const mobileNetPath = `https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json`;

export const loadTruncatedMobileNet = async () => {
  try {
    const mobileNet = await tf.loadModel(mobileNetPath);
    const layer = mobileNet.getLayer(`conv_pw_13_relu`);
    const truncatedModel = tf.model({ inputs: mobileNet.inputs, outputs: layer.output });
    return truncatedModel;
  } catch (err) {
    console.err(err);
  }
};

const cropImageTensor = (img) => {
  const size = Math.min(img.shape[0], img.shape[1]);
  const centerHeight = img.shape[0] / 2;
  const beginHeight = centerHeight - size / 2;
  const centerWidth = img.shape[1] / 2;
  const beginWidth = centerWidth - size / 2;
  return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
};

const resizeImageTensor = img => tf.image.resizeBilinear(img, [224, 224]);

const batchImageTensor = (img) => {
  const batched = img.expandDims(0);
  return batched.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
};

const formatImage = async tensorImage => tf.tidy(() => {
  const cropped = cropImageTensor(tensorImage);
  tensorImage.dispose();
  const resized = resizeImageTensor(cropped);
  const fullyFormattedImage = batchImageTensor(resized);
  // console.log('this is the final format of your image tensor: ', batched)
  return fullyFormattedImage;
});

const predictFromTruncated = async (img) => {
  const truncatedModel = await loadTruncatedMobileNet();
  const imageToPredict = await formatImage(img);
  const prediction = await truncatedModel.predict(imageToPredict);
  return prediction;
};

const predict = async (modelName, image, labelKey) => {
  try {
    const customModel = await tf.loadModel(`indexeddb://${modelName}`);
    const tensorImage = tf.fromPixels(image);
    console.log(`%c Got image tensor`, `color: #4ff7a8; font-weight: bold`, tensorImage.shape);
    // make a prediction through truncated mobilenet, getting the internal
    // activation output from the model
    console.log(`Making prediction...`);
    const activation = await predictFromTruncated(tensorImage); // [1,7,7,256]
    // make a prediction through our newly-trained model using this activation as input
    const prediction = await customModel.predict(activation);
    prediction.print();
    // Returns the index with the maximum probability. This number corresponds
    // to the class the model thinks is the most probable given the input.
    console.log(labelKey);
    const predictedLabelIndex = prediction.as1D().argMax().dataSync()[0];
    console.log(`${modelName} model predicts ${Object.keys(labelKey)[predictedLabelIndex]}`);
    return Object.keys(labelKey)[predictedLabelIndex];
  } catch (err) {
    console.log(err);
  }
};

export default predict;
