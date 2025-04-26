import React, { useState } from 'react';
import axios from 'axios';

const PatientForm = ({ onPatientAdded }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    status: 'Active'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await axios.post('/api/patients', formData);
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        status: 'Active'
      });
      onPatientAdded();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <h2>Add New Patient</h2>
      
      <div className="form-group">
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </label>
      </div>
      
      <div className="form-group">
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </label>
      </div>
      
      <div className="form-group">
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
        </label>
      </div>
      
      <div className="form-group">
        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
      </div>
      
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default PatientForm;