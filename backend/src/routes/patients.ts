import { Router } from 'express';
import prisma from '../libs/prisma';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const patients = await prisma.patient.findMany();
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

router.post('/', async (req, res) => {
  const { name, dateOfBirth, status } = req.body;

  if (!name || !dateOfBirth || !status) {
    return res.status(400).json({ error: 'All fields (name, dateOfBirth, status) are required' });
  }

  try {
    const newPatient = await prisma.patient.create({
      data: {
        name,
        dateOfBirth: new Date(dateOfBirth),
        status: status.toUpperCase(),
      },
    });
    res.status(201).json(newPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new patient' });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status field is required' });
  }

  try {
    const updatedPatient = await prisma.patient.update({
      where: { id: Number(id) },
      data: { status: status.toUpperCase() },
    });

    res.json(updatedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update patient status' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPatient = await prisma.patient.delete({
      where: { id: Number(id) },
    });

    res.json(deletedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
});

export default router;