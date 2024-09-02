// routes/inventarioRoutes.js

import express from 'express';
import {
    crearInventario,
    obtenerInventarios,
    obtenerInventarioPorId,
    actualizarInventario,
    eliminarInventario
} from '../controller/inventarioController.js';

const router = express.Router();

// Rutas de inventario
router.post('/', crearInventario); // Crear inventario
router.get('/', obtenerInventarios); // Obtener todos los inventarios
router.get('/listav1/:id', obtenerInventarioPorId);// Obtener inventario por ID
router.put('/:id', actualizarInventario); // Actualizar inventario por ID
router.delete('/:id', eliminarInventario); // Eliminar inventario por ID

export default router;
