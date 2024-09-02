import bcrypt from 'bcrypt';
import Usuario from '../models/usuario.js';
import jwt from 'jsonwebtoken';
import palsecret from '../palsecret.js'; // Asegúrate de que este archivo exporte correctamente la clave secreta

const usuarioController = {
    getUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            return res.status(200).json(usuarios);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Ocurrió un error al obtener la lista de usuarios', detalles: error.message });
        }
    },

    createUsuario: async (req, res) => {
        const { correo, contraseña, nombre, rol, tipo, idApiario } = req.body;

        if (!correo || !contraseña || !nombre || !rol || tipo == null) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        try {
            const saltRounds = 10;
            const contraseña_hash = await bcrypt.hash(contraseña, saltRounds);

            const nuevoUsuario = await Usuario.create({
                correo,
                contraseña_hash: Buffer.from(contraseña_hash),
                nombre,
                rol,
                tipo,
                idApiario
            });

            res.status(201).json(nuevoUsuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear el usuario", error });
        }
    },

    signIn: async (req, res) => {
        const { correo, contraseña } = req.body;

        if (!correo || !contraseña) {
            return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
        }

        try {
            const user = await Usuario.findOne({ where: { correo } });

            if (!user) {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
            }

            // Convertir el Buffer a string
            const contraseñaHash = user.contraseña_hash.toString('utf-8'); 

            // Verificar la contraseña
            if (!bcrypt.compareSync(contraseña, contraseñaHash)) {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
            }

            const roles = [user.rol]; // Suponiendo que el rol está en la tabla de usuarios

            const token = jwt.sign(
                { id: user.idUsuario, roles },
                palsecret.SECRET, // Asegúrate de que palsecret tenga la propiedad SECRET
                { expiresIn: '1h' }
            );

            res.json({ token, roles });
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    signUp: async (req, res) => {
        const { correo, contraseña, nombre, rol, tipo, idApiario } = req.body;

        if (!correo || !contraseña || !nombre || !rol || tipo == null) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        try {
            const saltRounds = 10;
            const contraseña_hash = await bcrypt.hash(contraseña, saltRounds);

            const nuevoUsuario = await Usuario.create({
                correo,
                contraseña_hash: Buffer.from(contraseña_hash),
                nombre,
                rol,
                tipo,
                idApiario
            });

            res.status(201).json({ message: 'Usuario registrado con éxito', nuevoUsuario });
        } catch (error) {
            console.error('Error en el registro:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
};

export default usuarioController;
