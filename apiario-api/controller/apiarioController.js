// controllers/apiarioController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Apiario from '../models/apiario.js';
import palsecret from '../palsecret.js'; // Asegúrate de que palsecret.js exporte la clave secreta

// Crear un nuevo apiario
export const crearApiario = async (req, res) => {
    const { Descripcion, municipio, direccion, id_persona, Nombre, Estado, contraseña, id_usuario } = req.body;
    try {
        // Hashear la contraseña antes de guardarla en la base de datos
        const contraseña_hash = await bcrypt.hash(contraseña, 10);

        const nuevoApiario = await Apiario.create({
            Descripcion,
            municipio,
            direccion,
            id_persona,
            Nombre,
            Estado,
            contraseña_hash,
            id_usuario
        });

        // Generar un token JWT al crear un nuevo apiario
        const token = jwt.sign({ id_apiario: nuevoApiario.id_apiario, id_usuario: nuevoApiario.id_usuario }, palsecret, {
            expiresIn: '5m' // El token expirará en 5 minutos
        });

        res.status(201).json({ apiario: nuevoApiario, token });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el apiario' });
    }
};

// Obtener todos los apiarios (puedes requerir JWT aquí si es necesario)
export const obtenerApiarios = async (req, res) => {
    try {
        const apiarios = await Apiario.findAll();
        res.status(200).json(apiarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los apiarios' });
    }
};

// Obtener un apiario por ID
export const obtenerApiarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const apiario = await Apiario.findByPk(id);
        if (apiario) {
            res.status(200).json(apiario);
        } else {
            res.status(404).json({ error: 'Apiario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el apiario' });
    }
};

// Actualizar un apiario por ID
export const actualizarApiario = async (req, res) => {
    const { id } = req.params;
    const { Descripcion, municipio, direccion, id_persona, Nombre, Estado, contraseña, id_usuario } = req.body;
    try {
        const apiario = await Apiario.findByPk(id);
        if (apiario) {
            apiario.Descripcion = Descripcion;
            apiario.municipio = municipio;
            apiario.direccion = direccion;
            apiario.id_persona = id_persona;
            apiario.Nombre = Nombre;
            apiario.Estado = Estado;

            // Si se proporciona una nueva contraseña, se hashea y se actualiza
            if (contraseña) {
                apiario.contraseña_hash = await bcrypt.hash(contraseña, 10);
            }

            apiario.id_usuario = id_usuario;

            await apiario.save();
            res.status(200).json(apiario);
        } else {
            res.status(404).json({ error: 'Apiario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el apiario' });
    }
};

// Eliminar un apiario por ID
export const eliminarApiario = async (req, res) => {
    const { id } = req.params;
    try {
        const apiario = await Apiario.findByPk(id);
        if (apiario) {
            await apiario.destroy();
            res.status(200).json({ mensaje: 'Apiario eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Apiario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el apiario' });
    }
};
