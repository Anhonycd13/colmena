// controllers/detalleInventarioController.js
import DetalleInventario from '../models/detalleinventario.js';

// Crear un nuevo detalle de inventario
export const crearDetalleInventario = async (req, res) => {
    const { id_inventario, id_Producto, cantidad } = req.body;

    try {
        const nuevoDetalle = await DetalleInventario.create({
            id_inventario,
            id_Producto,
            cantidad
        });
        res.status(201).json(nuevoDetalle);
    } catch (error) {
        console.error('Error detallado:', error); // Imprime el error completo
        res.status(500).json({ error: 'Error al crear el detalle de inventario', details: error.message });
    }
};

// Obtener todos los detalles de inventario
export const obtenerDetallesInventario = async (req, res) => {
    try {
        const detalles = await DetalleInventario.findAll();
        res.status(200).json(detalles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los detalles de inventario' });
    }
};

// Obtener un detalle de inventario por ID
export const obtenerDetalleInventarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const detalle = await DetalleInventario.findByPk(id);
        if (detalle) {
            res.status(200).json(detalle);
        } else {
            res.status(404).json({ error: 'Detalle de inventario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el detalle de inventario' });
    }
};

// Actualizar un detalle de inventario por ID
export const actualizarDetalleInventario = async (req, res) => {
    const { id } = req.params;
    const { id_inventario, id_Producto, cantidad } = req.body;
    try {
        const detalle = await DetalleInventario.findByPk(id);
        if (detalle) {
            detalle.id_inventario = id_inventario;
            detalle.id_Producto = id_Producto;
            detalle.cantidad = cantidad;

            await detalle.save();
            res.status(200).json(detalle);
        } else {
            res.status(404).json({ error: 'Detalle de inventario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el detalle de inventario' });
    }
};

// Eliminar un detalle de inventario por ID
export const eliminarDetalleInventario = async (req, res) => {
    const { id } = req.params;
    try {
        const detalle = await DetalleInventario.findByPk(id);
        if (detalle) {
            await detalle.destroy();
            res.status(200).json({ mensaje: 'Detalle de inventario eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Detalle de inventario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el detalle de inventario' });
    }
};