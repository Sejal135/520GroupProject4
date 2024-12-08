import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Render the main App component
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure this matches the <div id="root"></div> in public/index.html
);