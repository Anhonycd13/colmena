import express from 'express';
import {
    crearApiario,
    obtenerApiarios,
    obtenerApiarioPorId,
    actualizarApiario,
    eliminarApiario
} from '../controller/apiarioController.js';

const router = express.Router();

// Ruta para crear un nuevo apiario
router.post('/', crearApiario);

// Ruta para obtener todos los apiarios
router.get('/', obtenerApiarios);

// Ruta para obtener un apiario por su ID
router.get('/:id', obtenerApiarioPorId);

// Ruta para actualizar un apiario por su ID
router.put('/:id', actualizarApiario);

// Ruta para eliminar un apiario por su ID
router.delete('/:id', eliminarApiario);

export default router;
