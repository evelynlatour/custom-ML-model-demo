import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import PredictImage from "./PredictImage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      localModels: [],
      loadedModelName: ``,
      isModelLoaded: false,
    };
  }

  listLocalModels = async () => {
    const getModels = await tf.io.listModels();
    console.log(getModels);
    const models = Object.keys(getModels);
    const modelNames = models.map(model => model.substring(12));
    this.setState({ localModels: modelNames, isModelLoaded: false });
  };

  loadLocalModel = async (modelName) => {
    const model = await tf.loadModel(`indexeddb://${modelName}`);
    console.log(model);
    this.setState({ loadedModelName: modelName, isModelLoaded: true, localModels: [] });
  };

  render() {
    const { localModels, loadedModelName, isModelLoaded } = this.state;
    return (
      <>
        <h1>use local models</h1>
        {isModelLoaded && <h2>{`loaded: "${loadedModelName}"`}</h2>}
        <button onClick={this.listLocalModels}>List Local Models</button>
        {localModels.map(model => (
          <div>
            <p key={model}>{model}</p>
            <button onClick={() => this.loadLocalModel(model)}>Load Model</button>
          </div>
        ))}
        {isModelLoaded && <PredictImage />}
      </>
    );
  }
}

export default App;
