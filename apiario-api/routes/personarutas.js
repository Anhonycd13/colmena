import { Router } from 'express';
import personaController from '../controller/personaController.js';

const router = Router();

// Crear una nueva persona
router.post('/', personaController.crearPersona);

// Obtener todas las personas
router.get('/', personaController.obtenerPersonas);

// Obtener una persona por ID
router.get('/:id', personaController.obtenerPersonaPorId);

// Actualizar una persona
router.put('/:id', personaController.actualizarPersona);

// Eliminar una persona
router.delete('/:id', personaController.eliminarPersona);

export default router;
