import express from 'express';
import usuarioController from '../controller/usuarioController.js';
import { verifyToken } from '../middlewares/verificarApiario.js';

const router = express.Router();

// Obtener todos los usuarios (Ruta protegida, solo Admin)
router.get('/', verifyToken(['Administrador']), usuarioController.getUsuarios);

// Crear un nuevo usuario (Registro)
router.post('/signup', usuarioController.signUp);

// Iniciar sesión (Login)
router.post('/signin', usuarioController.signIn);

// Ruta protegida solo para Administradores
router.get('/admin-dashboard', verifyToken(['Administrador']), usuarioController.adminDashboard);

// Ruta protegida para Empleados y Administradores
router.get('/empleado-dashboard', verifyToken(['Empleado', 'Administrador']), usuarioController.empleadoDashboard);

export default router;
