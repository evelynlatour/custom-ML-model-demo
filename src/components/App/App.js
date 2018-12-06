import React, { Component } from "react";
import LoadModel from "../LoadModel/LoadModel";
import Header from "../Header/Header";
import styles from './App.css';
import StyleWrapper from './StyleWrapper/StyleWrapper';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <StyleWrapper>
          <Header />
          <LoadModel />
        </StyleWrapper>
      </>
    );
  }
}

export default App;
