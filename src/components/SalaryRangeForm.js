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
      const response = await fetch('http://localhost:3000/api/jobs');
      const data = await response.json();
      setJobRoles(data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSalaryRange(`$50,000 - $100,000`);
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
              <option key={role._id} value={role._id}>
                {role.name}
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
              <option key={location._id} value={location._id}>
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
          <p>{salaryRange}</p>
        </div>
      )}
    </div>
  );
}

export default SalaryRangeForm;