import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <>
    <Routes />
    <ToastContainer />
  </>,
  document.getElementById('root')
);
