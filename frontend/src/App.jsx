import React from 'react';
import PatientList from './components/PatientList';
import './App.css';
import AllPatients from './pages/AllPatients';

function App() {
  return (
    <div className="App">
      <h1>Patient Management System</h1>
      <PatientsTable />
    </div>
  );
}

export default App;