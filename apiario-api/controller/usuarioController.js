import bcrypt from 'bcrypt';
import Usuario from '../models/usuario.js';
import Apiario from '../models/apiario.js';
import jwt from 'jsonwebtoken';
import palsecret from '../palsecret.js';
import { verifyToken } from '../middlewares/verificarApiario.js'; // Middleware de autenticación

const usuarioController = {
    // Obtener todos los usuarios (solo Admin puede acceder)
    getUsuarios: [
        verifyToken(['Administrador']),  // Middleware para restringir acceso solo a Administradores
        async (req, res) => {
            try {
                const usuarios = await Usuario.findAll();
                return res.status(200).json(usuarios);
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Ocurrió un error al obtener la lista de usuarios', detalles: error.message });
            }
        }
    ],

    // Registrar un usuario (accesible sin autenticación)
    signUp: async (req, res) => {
        const { correo, contraseña, nombre, rol, tipo, id_apiario } = req.body;

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
                id_apiario
            });

            res.status(201).json({ message: 'Usuario registrado con éxito', nuevoUsuario });
        } catch (error) {
            console.error('Error en el registro:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    // Inicio de sesión
    signIn: async (req, res) => {
        const { correo, contraseña } = req.body;

        if (!correo || !contraseña) {
            return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
        }

        try {
            const user = await Usuario.findOne({
                where: { correo },
                include: [{ model: Apiario, attributes: ['id_apiario', 'Nombre'] }] // Incluir id y nombre del apiario
            });

            if (!user) {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
            }

            const contraseñaHash = user.contraseña_hash.toString('utf-8');
            if (!bcrypt.compareSync(contraseña, contraseñaHash)) {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
            }

            const roles = [user.rol]; 
            const id_apiario = user.Apiario?.id_apiario; 
            const nombre = user.Apiario?.Nombre;

            const token = jwt.sign(
                { id: user.idUsuario, roles, id_apiario, nombre },
                palsecret.SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token, roles, id_apiario, nombre });
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    // Rutas protegidas para Admin y Empleados
    adminDashboard: [
        verifyToken(['Administrador']),
        (req, res) => {
            res.json({ message: 'Bienvenido Administrador' });
        }
    ],
    
    empleadoDashboard: [
        verifyToken(['Empleado', 'Administrador']),
        (req, res) => {
            res.json({ message: 'Bienvenido Empleado' });
        }
    ]
};

export default usuarioController;
