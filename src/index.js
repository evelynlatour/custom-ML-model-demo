import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

const title = `Minimal React Setup`;

ReactDOM.render(
  <App />,
  document.getElementById(`app`),
);

module.hot.accept(); // allow hot reload

if (module.hot) { // quiet HMR logging
  require(`webpack/hot/log`).setLogLevel(`error`);
}
