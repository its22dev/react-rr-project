import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/stylesheet/main.module.scss';
import App from './App';
import { HashRouter } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

