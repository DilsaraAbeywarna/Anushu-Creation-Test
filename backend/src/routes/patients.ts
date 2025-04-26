import { Router } from 'express';
import prisma from '../libs/prisma';

const router = Router();

// interface Patient {
//   id: number;
//   name: string;
//   dateOfBirth: Date;
//   status: 'active' | 'inactive';
// }


router.get('/test', async (req, res) => {
  res.status(200).json({ message: 'Route is working!' });
});

router.get('/hh', async (req, res) => {

  try {
    const patients = await prisma.patient.findMany();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
  //TODO: implement the logic to fetch patients from a database
});



router.post('/a', async (req, res) => {
  try {
    const { name, dateOfBirth, status } = req.body;

    if (!name || !dateOfBirth || !status) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        details: {
          name: !name ? 'Missing' : 'Provided',
          dateOfBirth: !dateOfBirth ? 'Missing' : 'Provided',
          status: !status ? 'Missing' : 'Provided'
        }
      });
    }

    const newPatient = await prisma.patient.create({
      data: {
        name,
        dateOfBirth: new Date(dateOfBirth),
        status,
      },
    });

    return res.status(201).json({
      success: true,
      data: newPatient
    });
    
  } catch (error) {
    // Proper error message extraction
    const errorMessage = error instanceof Error 
      ? error.message 
      : typeof error === 'string' 
        ? error 
        : 'Unknown error occurred';

    return res.status(500).json({
      success: false,
      error: errorMessage,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error instanceof Error ? error.stack : undefined,
        fullError: JSON.stringify(error, Object.getOwnPropertyNames(error))
      })
    });
  }
});



router.get('/tt', async (req, res) => {
  try {
    // Your successful response
    res.json({ 
      success: true, 
      data: [{ id: 1, name: "Test Patient" }] 
    });
  } catch (error: unknown) {
    // Type-safe error handling
    let errorMessage = "An unknown error occurred";
    let stackTrace: string | undefined;
    
    if (error instanceof Error) {
      errorMessage = error.message;
      stackTrace = error.stack;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    console.error("Error:", errorMessage, stackTrace);
    
    res.status(500).json({
      success: false,
      error: errorMessage,
      ...(process.env.NODE_ENV === 'development' && { stack: stackTrace })
    });
  }
});

// Add this temporary route
router.get('/test-fast', (req, res) => {
  res.json({ status: "Immediate response" });
});

router.post('/patient', async (req, res) => {

  const { name, dateOfBirth, status } = req.body;
  try {
    const newPatient = await prisma.patient.create({
      data: { name, dateOfBirth: new Date(dateOfBirth), status },
    });
    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Failed to create patient' });
  }
  //TODO: implement the logic to add a new patient to a database
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedPatient = await prisma.patient.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Failed to update patient' });
  }
  //TODO: implement the logic to update a patient in a database
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.patient.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
  //TODO: implement the logic to delete a patient from a database
});

export default router;
