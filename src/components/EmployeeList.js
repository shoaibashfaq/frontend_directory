// src/components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import EmployeeDetails from './EmployeeDetails.js';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/all_employees');
      const data = await response.json();
      // console.log(data)
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  return (
    <div className="employee-list">
      <div className="employee-grid">
        {employees.map((employee) => (
          <Link 
            to={`/employee/${employee._id}`} 
            key={employee._id} 
            className="employee-card"
          >
            <h3>{employee.name}</h3>
            <p>{employee.jobRole}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;