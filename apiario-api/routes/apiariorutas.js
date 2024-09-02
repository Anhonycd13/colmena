import express from 'express';
import {
    crearApiario,
    obtenerApiarios,
    obtenerApiarioPorId,
    actualizarApiario,
    eliminarApiario
} from '../controller/apiarioController.js';

import { validarContraseñaApiario } from '../controller/apiarioController.js';

const router = express.Router();

// Ruta para crear un nuevo apiario
router.post('/apiarios', crearApiario);

// Ruta para obtener todos los apiarios
router.get('/apiarios', obtenerApiarios);

// Ruta para obtener un apiario por su ID
router.get('/apiarios/:id', obtenerApiarioPorId);

// Ruta para actualizar un apiario por su ID
router.put('/apiarios/:id', actualizarApiario);

// Ruta para eliminar un apiario por su ID
router.delete('/apiarios/:id', eliminarApiario);

// Ruta para validar la contraseña del apiario
router.post('/validate-password', validarContraseñaApiario);


export default router;
