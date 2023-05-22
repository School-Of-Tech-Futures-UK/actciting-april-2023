import React from 'react';
import logo from './logo.svg';
//import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
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
