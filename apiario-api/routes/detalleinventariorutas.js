// routes/detalleInventarioRoutes.js
import express from 'express';
import {
    crearDetalleInventario,
    obtenerDetallesInventario,
    obtenerDetalleInventarioPorId,
    actualizarDetalleInventario,
    eliminarDetalleInventario
} from '../controller/detalleinventariocontroller.js';

const router = express.Router();

// Rutas para detalle de inventario
router.post('/', crearDetalleInventario); // Crear detalle de inventario
router.get('/', obtenerDetallesInventario); // Obtener todos los detalles de inventario
router.get('/:id', obtenerDetalleInventarioPorId); // Obtener detalle de inventario por ID
router.put('/:id', actualizarDetalleInventario); // Actualizar detalle de inventario por ID
router.delete('/:id', eliminarDetalleInventario); // Eliminar detalle de inventario por ID

export default router;