import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Screens/Home';
import Signin from './Screens/Signin';
import Chat from './Screens/Chat';
import Chattest from './Screens/Chattest';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
