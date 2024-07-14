// src/components/AddEmployeeForm.js
import React, { useState, useEffect } from "react";

function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalZip: "",
    jobRole: "",
    location: "",
  });
  const [jobRoles, setJobRoles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchJobRoles();
    fetchLocations();
  }, []);

  const fetchJobRoles = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/jobs");
      const data = await response.json();
      setJobRoles(data);
    } catch (error) {
      console.error("Error fetching job roles:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/locations");
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/add_employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Employee added successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          postalZip: "",
          jobRole: "",
          location: "",
        });
      } else {
        setMessage(data.message || "Failed to add employee");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      setMessage("An error occurred while adding the employee");
    }
  };

  return (
    <div className="add-employee-form">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalZip">Postal/Zip Code:</label>
          <input
            type="text"
            id="postalZip"
            name="postalZip"
            value={formData.postalZip}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobRole">Job Role:</label>
          <select
            id="jobRole"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a job role</option>
            {jobRoles.map((role) => (
              <option key={role._id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
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
        <button type="submit">Add Employee</button>
      </form>
      {message && (
        <p
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default AddEmployeeForm;
