import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store.js';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Header />
    <div className='m-0 p-0 h-full w-full font-Quicksand'>
      <App />
    </div>
  </Provider>
);
