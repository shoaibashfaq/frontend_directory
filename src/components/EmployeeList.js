import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      searchEmployees(currentPage, searchQuery);
    } else {
      fetchEmployees(currentPage);
    }
  }, [currentPage, searchQuery]);

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

  const searchEmployees = async (page, query) => {
    try {
      const response = await fetch(`http://localhost:3000/api/search?page=${page}&q=${query}`);
      const data = await response.json();
      setEmployees(data.employees);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const formatJobRole = (jobRole) => {
    return jobRole
      .split('_')
      .join(' ');
  };

  return (
    <div className="employee-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="employee-list-items">
        {employees.map((employee) => (
          <li key={employee._id}>
            <Link 
              to={`/employee/${employee._id}`} 
              className="employee-list-item"
            >
              <span className="employee-name">{employee.name}</span>
              <span className="employee-job-role">{formatJobRole(employee.jobRole)}</span>
            </Link>
          </li>
        ))}
      </ul>
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