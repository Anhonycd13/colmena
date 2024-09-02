import Persona from '../models/persona.js'; // Asegúrate de que la ruta al modelo sea correcta

const personaController = {
    // Crear una nueva persona
    crearPersona: async (req, res) => {
        const { dpi, Telefono, Correo, NIT, direccion, nombre, apellido } = req.body;

        if (!dpi || !Telefono || !Correo || !NIT || !direccion || !nombre || !apellido) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        try {
            const nuevaPersona = await Persona.create({
                dpi,
                Telefono,
                Correo,
                NIT,
                direccion,
                nombre,
                apellido
            });

            res.status(201).json(nuevaPersona);
        } catch (error) {
            console.error(error);

            if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ message: 'El DPI, NIT o Correo ya está registrado.' });
            } else {
                res.status(500).json({ message: 'Error al crear la persona.' });
            }
        }
    },

    // Obtener todas las personas
    obtenerPersonas:async (req, res) => {
        try {
            const personas = await Persona.findAll();
            res.status(200).json(personas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las personas.' }); // Asegúrate de que el mensaje aquí sea correcto
        }
    },
    
    // Obtener una persona por ID
    obtenerPersonaPorId: async (req, res) => {
        const { id } = req.params;

        try {
            const persona = await Persona.findByPk(id);

            if (persona) {
                res.status(200).json(persona);
            } else {
                res.status(404).json({ message: 'Persona no encontrada.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener la persona.' });
        }
    },

    // Actualizar una persona
    actualizarPersona: async (req, res) => {
        const { id } = req.params;
        const { dpi, Telefono, Correo, NIT, direccion, nombre, apellido } = req.body;

        if (!dpi || !Telefono || !Correo || !NIT || !direccion || !nombre || !apellido) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        try {
            const persona = await Persona.findByPk(id);

            if (persona) {
                persona.dpi = dpi;
                persona.Telefono = Telefono;
                persona.Correo = Correo;
                persona.NIT = NIT;
                persona.direccion = direccion;
                persona.nombre = nombre;
                persona.apellido = apellido;

                await persona.save();
                res.status(200).json(persona);
            } else {
                res.status(404).json({ message: 'Persona no encontrada.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar la persona.' });
        }
    },

    // Eliminar una persona
    eliminarPersona: async (req, res) => {
        const { id } = req.params;

        try {
            const persona = await Persona.findByPk(id);

            if (persona) {
                await persona.destroy();
                res.status(200).json({ message: 'Persona eliminada con éxito.' });
            } else {
                res.status(404).json({ message: 'Persona no encontrada.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar la persona.' });
        }
    }
};

export default personaController;
