// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList.js';
import EmployeeDetails from './components/EmployeeDetails.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Employee Directory</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;