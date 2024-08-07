import { Router } from "express";
import usuarioController from "../controller/usuarioController.js"; // Asegúrate de que la ruta sea correcta

const router = Router();

// Ruta para obtener la lista de usuarios
router
    .route('/lista')
    .get(usuarioController.getUsuarios);

// Ruta para crear un nuevo usuario
router
    .route('/usuario')
    .post(usuarioController.createUsuario);

// Ruta para registrar un nuevo usuario (sign up)
router
    .post('/signup', usuarioController.signUp);

// Ruta para iniciar sesión (sign in)
router
    .post('/signin', usuarioController.signIn);

export default router;
