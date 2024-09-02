import { Router } from 'express';
import personaController from '../controller/personaController.js';

const router = Router();

// Crear una nueva persona
router.post('/personas', personaController.crearPersona);

// Obtener todas las personas
router.get('/personas', personaController.obtenerPersonas);

// Obtener una persona por ID
router.get('/personas/:id', personaController.obtenerPersonaPorId);

// Actualizar una persona
router.put('/personas/:id', personaController.actualizarPersona);

// Eliminar una persona
router.delete('/personas/:id', personaController.eliminarPersona);

export default router;
