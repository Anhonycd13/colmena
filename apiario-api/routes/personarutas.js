import express from 'express';
import { crearPersona, obtenerPersonas, obtenerPersonaPorId, actualizarPersona, eliminarPersona } from '../controller/personaController.js';

const router = express.Router();

router.post('/', crearPersona); // Cambié '/personas' a '/' porque ya estás añadiendo '/listav1/personas' en app.js
router.get('/', obtenerPersonas);
router.get('/:id', obtenerPersonaPorId);
router.put('/:id', actualizarPersona);
router.delete('/:id', eliminarPersona);

export default router;
