
// controllers/apiarioController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Apiario from '../models/apiario.js';
import palsecret from '../palsecret.js'; // Asegúrate de que palsecret.js exporte la clave secreta

const SECRET_KEY = palsecret.SECRET;

// Crear un nuevo apiario
export const crearApiario = async (req, res) => {
    const { Descripcion, municipio, direccion, Nombre, Estado, contraseña } = req.body;

    if (!Descripcion || !municipio || !direccion || !Nombre || Estado === undefined || !contraseña) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    try {
        // Hashear la contraseña antes de guardarla en la base de datos
        const saltRounds = 10;
        const contraseña_hash = await bcrypt.hash(contraseña, saltRounds);

        const nuevoApiario = await Apiario.create({
            Descripcion,
            municipio,
            direccion,
            Nombre,
            Estado,
            contraseña_hash: Buffer.from(contraseña_hash, 'utf8') // Convierte la cadena a Buffer
        });

        // Generar un token JWT al crear un nuevo apiario
        const token = jwt.sign({ id_apiario: nuevoApiario.id_apiario }, SECRET_KEY, {
            expiresIn: '5m' // El token expirará en 5 minutos
        });

        res.status(201).json({ apiario: nuevoApiario, token });
    } catch (error) {
        console.error('Error al crear el apiario:', error);
        res.status(500).json({ error: 'Error al crear el apiario' });
    }
};

// El resto de tus funciones permanece igual




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
    const { Descripcion, municipio, direccion, Nombre, Estado, contraseña } = req.body;
    try {
        const apiario = await Apiario.findByPk(id);
        if (apiario) {
            apiario.Descripcion = Descripcion;
            apiario.municipio = municipio;
            apiario.direccion = direccion;
            apiario.Nombre = Nombre;
            apiario.Estado = Estado;

            // Si se proporciona una nueva contraseña, se hashea y se actualiza
            if (contraseña) {
                apiario.contraseña_hash = Buffer.from(await bcrypt.hash(contraseña, 10), 'utf8');
            }
            

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

// Ruta para validar la contraseña del apiario
export const validarContraseñaApiario = async (req, res) => {
    const { apiario_id, password } = req.body;

    if (!apiario_id || !password) {
        return res.status(400).json({ message: 'Apiario ID y contraseña son requeridos' });
    }

    try {
        const apiarioRecord = await Apiario.findByPk(apiario_id);

        if (!apiarioRecord) {
            return res.status(404).json({ error: 'Apiario no encontrado' });
        }

        const contraseñaEsCorrecta = await bcrypt.compare(password, apiarioRecord.contraseña_hash.toString('utf8'));
        if (contraseñaEsCorrecta) {
            res.status(200).json({ valid: true });
        } else {
            res.status(401).json({ valid: false });
        }
    } catch (error) {
        console.error('Error al validar la contraseña:', error);  // Agrega este registro para más detalles
        res.status(500).json({ error: 'Error al validar la contraseña' });
    }
};



