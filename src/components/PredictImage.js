import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";

class PredictImage extends Component {
  constructor() {
    super();
    this.state = {
      imageInputBar: ``,
      imageUrl: ``,
      imageMounted: false,
    };
  }

  mountImage = (event) => {
    event.preventDefault();
    const { imageInputBar } = this.state;
    console.log(this.state.imageUrl);
    this.setState({ imageUrl: imageInputBar, imageMounted: true });
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { imageUrl, imageMounted, imageInputBar } = this.state;
    return (
      <div>
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
        {imageMounted && <img src={imageUrl} alt="predict" style={{ width: `300px`, margin: `2em` }} />}
      </div>
    );
  }
}

export default PredictImage;
