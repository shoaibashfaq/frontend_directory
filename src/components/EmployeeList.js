import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  const fetchEmployees = async (page) => {
    try {
      const response = await fetch(`http://localhost:3000/api/all_employees?page=${page}`);
      const data = await response.json();
      setEmployees(data.employees);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default EmployeeList;