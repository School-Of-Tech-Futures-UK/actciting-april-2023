import React from 'react';
import './styles.css';
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
