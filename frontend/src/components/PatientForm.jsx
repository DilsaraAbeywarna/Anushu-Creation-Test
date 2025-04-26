import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from '@mui/material';
import { addPatient, updatePatient } from '../api';

const PatientForm = ({ patient, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    status: 'active',
  });
  const [errors, setErrors] = useState({
    name: false,
    dateOfBirth: false,
    status: false,
  });
  const [touched, setTouched] = useState({
    name: false,
    dateOfBirth: false,
    status: false,
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        dateOfBirth: patient.dateOfBirth.split('T')[0],
        status: patient.status,
      });
      setTouched({
        name: true,
        dateOfBirth: true,
        status: true,
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let isValid = true;
    
    if (name === 'name') {
      isValid = value.trim() !== '';
    } else if (name === 'dateOfBirth') {
      isValid = value !== '';
    } else if (name === 'status') {
      isValid = value !== '';
    }
    
    setErrors((prev) => ({
      ...prev,
      [name]: !isValid,
    }));
    
    return isValid;
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      dateOfBirth: formData.dateOfBirth === '',
      status: formData.status === '',
    };
    
    setErrors(newErrors);
    setTouched({
      name: true,
      dateOfBirth: true,
      status: true,
    });
    
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      if (patient) {
        await updatePatient(patient.id, formData);
      } else {
        await addPatient(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{patient ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          margin="normal"
          required
          error={errors.name && touched.name}
          helperText={errors.name && touched.name ? 'Name is required' : ''}
        />
        <TextField
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}          
          required
          error={errors.dateOfBirth && touched.dateOfBirth}
          helperText={errors.dateOfBirth && touched.dateOfBirth ? 'Date of Birth is required' : ''}
        />
        <TextField
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          margin="normal"
          required
          error={errors.status && touched.status}
          helperText={errors.status && touched.status ? 'Status is required' : ''}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {patient ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientForm;