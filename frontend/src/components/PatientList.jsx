import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TablePagination,
  TableSortLabel,
  Box,
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { getPatients, deletePatient } from '../api';
import PatientForm from './PatientForm';
import PatientFilter from './PatientFilter';
import PatientSearch from './PatientSearch';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      await deletePatient(id);
      fetchPatients();
    }
  };

  const handleEdit = (patient) => {
    setEditPatient(patient);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditPatient(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchPatients();
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    const matchesSearch = patient.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortPatients = (a, b) => {
    if (orderBy === 'name') {
      return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (orderBy === 'dateOfBirth') {
      return order === 'asc'
        ? new Date(a.dateOfBirth) - new Date(b.dateOfBirth)
        : new Date(b.dateOfBirth) - new Date(a.dateOfBirth);
    }
    return 0;
  };

  const paginatedPatients = filteredPatients
    .sort(sortPatients)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAdd}
        >
          Add Patient
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <PatientSearch value={searchText} onChange={handleSearchChange} />
          <PatientFilter value={filterStatus} onChange={handleFilterChange} />
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'dateOfBirth'}
                  direction={orderBy === 'dateOfBirth' ? order : 'asc'}
                  onClick={() => handleRequestSort('dateOfBirth')}
                >
                  Date of Birth
                </TableSortLabel>
              </TableCell>
              <TableCell>
                  Status
              </TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPatients.length > 0 ? (
              paginatedPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{new Date(patient.dateOfBirth).toLocaleDateString()}</TableCell>
                  <TableCell>{patient.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(patient)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(patient.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No patients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredPatients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {showForm && <PatientForm patient={editPatient} onClose={handleFormClose} />}
    </Box>
  );
};

export default PatientList;
