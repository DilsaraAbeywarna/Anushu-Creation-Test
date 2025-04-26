import React from 'react';
import { TextField } from '@mui/material';

const PatientSearch = ({ value, onChange }) => {
  return (
    <TextField
      label="Search by Name"
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
      sx={{ width: 250 }}
    />
  );
};

export default PatientSearch;
