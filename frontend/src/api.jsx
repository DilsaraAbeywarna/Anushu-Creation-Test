import axios from 'axios';

const API_URL = 'http://localhost:5100/api/patients';

export const getPatients = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      return [];
    }
  };

  export const addPatient = async (patient) => {
    try {
      const response = await axios.post(`${API_URL}`, patient);
      return response.data;
    } catch (error) {
      console.error('Error adding patient:', error);
      throw error;
    }
  };

  export const updatePatient = async (id, patient) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, patient);
      return response.data;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  };
  

  export const deletePatient = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  };
