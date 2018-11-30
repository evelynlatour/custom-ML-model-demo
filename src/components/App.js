import React, { Component } from "react";
import LoadModel from "./LoadModel";
import Header from "./Header";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <Header />
        <LoadModel />
      </>
    );
  }
}

export default App;
