import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PatientsTable() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5100/api/patients/hh');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Patients</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={styles.th}>Patient ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Date of Birth</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td style={styles.td}>{patient.id}</td>
              <td style={styles.td}>{patient.name}</td>
              <td style={styles.td}>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
              <td style={styles.td}>{patient.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  th: {
    border: '1px solid black',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
  },
  td: {
    border: '1px solid black',
    padding: '8px',
  },
};

export default PatientsTable;
