import React, { Component } from "react";
import predict from "../utils/tfjs";
import topSleeveClassKey from "../utils/labelKeys";

class PredictImage extends Component {
  constructor() {
    super();
    this.state = {
      imageInputBar: ``,
      imageUrl: ``,
      imageMounted: false,
      prediction: ``,
      isPredicting: false,
    };
  }

  mountImage = (event) => {
    event.preventDefault();
    const { imageInputBar } = this.state;
    this.setState({ imageUrl: imageInputBar, imageMounted: true });
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  getPrediction = async (event) => {
    event.preventDefault();
    const image = document.getElementById(`mountedImage`);
    image.crossOrigin = `Anonymous`;
    try {
      this.setState({ isPredicting: true });
      const prediction = await predict(this.props.modelName, image, topSleeveClassKey);
      this.setState({ prediction, isPredicting: false });
    } catch (err) {
      console.error(`Error predicting`, err);
    }
  };

  render() {
    const {
      imageUrl, imageMounted, imageInputBar, prediction, isPredicting,
    } = this.state;
    return (
      <>
        <h2>predict image component renders here</h2>
        <form onSubmit={this.mountImage}>
          <label htmlFor="imageInputBar"> Paste image url here: </label>
          <input
            type="text"
            name="imageInputBar"
            style={{ width: `400px` }}
            value={imageInputBar}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {imageMounted && (
          <>
            <div>
              <img
                src={imageUrl}
                id="mountedImage"
                alt="predict"
                style={{ width: `300px`, margin: `2em` }} /* this will set dimensions for tensor */
                crossOrigin="Anonymous"
              />
            </div>
            <button onClick={this.getPrediction}>Predict</button>
            {isPredicting ? <p>Analyzing Image...</p> : null}
            {prediction && <p>{prediction}</p>}
          </>
        )}
      </>
    );
  }
}

export default PredictImage;
