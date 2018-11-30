import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import PredictImage from "./PredictImage";

class LoadModel extends Component {
  constructor() {
    super();
    this.state = {
      localModels: [],
      loadedModelName: ``,
      isModelLoaded: false,
    };
  }

  listLocalModels = async () => {
    try {
      const getModels = await tf.io.listModels();
      const models = Object.keys(getModels);
      const modelNames = models.map(model => model.substring(12));
      this.setState({ localModels: modelNames, isModelLoaded: false });
    } catch (err) {
      console.error(`Error loading models`, err);
    }
  };

  loadLocalModel = async (modelName) => {
    try {
      const model = await tf.loadModel(`indexeddb://${modelName}`);
      console.log(`%c Model Successfully Loaded`, `color: #4ff7a8; font-weight: bold`);
      this.setState({ loadedModelName: modelName, isModelLoaded: true, localModels: [] });
    } catch (err) {
      console.error(`Error loading the model from local storage`, err);
    }
  };

  render() {
    const { localModels, loadedModelName, isModelLoaded } = this.state;
    return (
      <>
        {isModelLoaded && <h2>{`loaded: "${loadedModelName}"`}</h2>}
        <button onClick={this.listLocalModels}>List Local Models</button>
        {localModels.map((model, idx) => (
          <div key={idx}>
            <p>{model}</p>
            <button onClick={() => this.loadLocalModel(model)}>Load Model</button>
          </div>
        ))}
        {isModelLoaded && <PredictImage modelName={loadedModelName} />}
      </>
    );
  }
}

export default LoadModel;
