import React, { Component } from 'react';
import styles from './StyleWrapper.css';

const StyleWrapper = props => (
  <div className={styles.wrapper}>
    {props.children}
  </div>
);

export default StyleWrapper;
