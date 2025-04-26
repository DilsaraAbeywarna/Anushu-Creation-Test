import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import PatientList from '../components/PatientList';

const Patients = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={6} sx={{ borderRadius: 4, padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Patient Management
        </Typography>
        <PatientList />
      </Paper>
    </Box>
  );
};

export default Patients;
