import React, { useState, useEffect } from 'react';

function SalaryRangeForm() {
  const [jobRole, setJobRole] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [jobRoles, setJobRoles] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchJobRoles();
    fetchLocations();
  }, []);

  const fetchJobRoles = async () => {
    try {
      // const response = await fetch('http://localhost:3000/api/jobs');
      // const data = await response.json();
      setJobRoles(['Engineer', 'Manager', 'Technician', 'Clerk', 'Sales', 'HR', 'Marketing', 'Consultant', 'Analyst', 'Executive']);
    } catch (error) {
      console.error('Error fetching job roles:', error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/locations');
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ jobRole, region: jobLocation })
      };
      const response = await fetch('http://127.0.0.1:5000/predict', requestOptions);
      const data = await response.json();
      setSalaryRange(data.predicted_salary);
    } catch (error) {
      console.error('Error fetching the prediction', error);
    }
  };

  return (
    <div className="salary-range-form">
      <h2>Salary Range Finder</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobRole">Job Role:</label>
          <select
            id="jobRole"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            required
          >
            <option value="">Select a job role</option>
            {jobRoles.map((role) => (
              <option value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="jobLocation">Job Location:</label>
          <select
            id="jobLocation"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            required
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location._id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Find Salary Range</button>
      </form>
      {salaryRange && (
        <div className="salary-result">
          <h3>Estimated Salary Range:</h3>
          <p>{`$${Math.round(salaryRange)}`}</p>
        </div>
      )}
    </div>
  );
}

export default SalaryRangeForm;