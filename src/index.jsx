//require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./app/redux/store.js";
import App from './app/App.jsx';
import './app/App.less';

const appElement = document.getElementById('app');

ReactDOM.render(<Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, 
appElement);