import express from 'express';
import cors from 'cors'; 
import patientRoutes from './routes/patients';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRoutes);

const PORT = 5100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
