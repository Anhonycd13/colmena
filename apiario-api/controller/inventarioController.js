// controllers/inventarioController.js

import Inventario from '../models/inventario.js';

// Crear un nuevo registro de inventario
export const crearInventario = async (req, res) => {
    const { Egresos, Ingresos, id_colmena, Fecha, id_usuario } = req.body;
    try {
        const nuevoInventario = await Inventario.create({
            Egresos,
            Ingresos,
            id_colmena,
            Fecha,
            id_usuario
        });
        res.status(201).json(nuevoInventario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el inventario' });
    }
};

// Obtener todos los registros de inventario
export const obtenerInventarios = async (req, res) => {
    try {
        const inventarios = await Inventario.findAll();
        res.status(200).json(inventarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los inventarios' });
    }
};

// Obtener un registro de inventario por ID
export const obtenerInventarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const inventario = await Inventario.findByPk(id);
        if (inventario) {
            res.status(200).json(inventario);
        } else {
            res.status(404).json({ error: 'Inventario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el inventario' });
    }
};

// Actualizar un registro de inventario por ID
export const actualizarInventario = async (req, res) => {
    const { id } = req.params;
    const { Egresos, Ingresos, id_colmena, Fecha, id_usuario } = req.body;
    try {
        const inventario = await Inventario.findByPk(id);
        if (inventario) {
            inventario.Egresos = Egresos;
            inventario.Ingresos = Ingresos;
            inventario.id_colmena = id_colmena;
            inventario.Fecha = Fecha;
            inventario.id_usuario = id_usuario;

            await inventario.save();
            res.status(200).json(inventario);
        } else {
            res.status(404).json({ error: 'Inventario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el inventario' });
    }
};

// Eliminar un registro de inventario por ID
export const eliminarInventario = async (req, res) => {
    const { id } = req.params;
    try {
        const inventario = await Inventario.findByPk(id);
        if (inventario) {
            await inventario.destroy();
            res.status(200).json({ mensaje: 'Inventario eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Inventario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el inventario' });
    }
};
