import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const PatientFilter = ({ value, onChange }) => {
  return (
    <TextField
      select
      label="Filter by Status"
      value={value}
      onChange={onChange}
      size="small"
      sx={{ width: 200 }}
    >
      <MenuItem value="all">All</MenuItem>
      <MenuItem value="ACTIVE">Active</MenuItem>
      <MenuItem value="INACTIVE">Inactive</MenuItem>
    </TextField>
  );
};

export default PatientFilter;
