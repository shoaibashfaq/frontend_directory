// src/components/EmployeeDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function EmployeeDetails() {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/employee/${id}`);
      const data = await response.json();
      setEmployee(data[0]);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  if (!employee) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="employee-details-container">
      <Link to="/" className="back-link">← Back to Directory</Link>
      <div className="employee-details">
        <div className="employee-header">
          <div className="employee-avatar">{employee.name.charAt(0)}</div>
          <h2>{employee.fullname}</h2>
          <p className="job-role">{employee.jobRole}</p>
        </div>
        <div className="employee-info">
          <InfoItem icon="📱" label="Phone" value={employee.phone} />
          <InfoItem icon="📧" label="Email" value={employee.email} />
          <InfoItem icon="🏠" label="Address" value={employee.address} />
          <InfoItem icon="📮" label="Postal/Zip Code" value={employee.postalZip} />
          <InfoItem icon="🌎" label="Region" value={employee.region} />
          <InfoItem icon="💰" label="Salary" value={`${employee.currency}`} />
        </div>
    
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="info-item">
      <span className="info-icon">{icon}</span>
      <span className="info-label">{label}:</span>
      <span className="info-value">{value}</span>
    </div>
  );
}

export default EmployeeDetails;