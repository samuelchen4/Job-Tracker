import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import TemplateScreen from './screens/TemplateScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <Router>
      <Header />
      <div className='m-0 p-0 h-full w-full font-Quicksand'>
        <Routes>
          <Route path='/template' element={<TemplateScreen />} />
          <Route path='*' element={<HomeScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
