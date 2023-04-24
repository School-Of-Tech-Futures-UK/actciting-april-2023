import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ActCitingRoutes from './components/ActCitingRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ActCitingRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
