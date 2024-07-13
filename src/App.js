// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList.js';
import EmployeeDetails from './components/EmployeeDetails.js';
import SalaryRangeForm from './components/SalaryRangeForm.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Employee Directory</h1>
        </header>
        <div className="main-container">
          <nav className="sidebar">
            <ul>
              <li>
                <Link to="/">Employee Lookup</Link>
              </li>
              <li>
                <Link to="/salary-range">Salary Range Finder</Link>
              </li>
            </ul>
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<EmployeeList />} />
              <Route path="/employee/:id" element={<EmployeeDetails />} />
              <Route path="/salary-range" element={<SalaryRangeForm />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;