import { Router } from "express";
import usuarioController from "../controller/usuarioController.js"; // Asegúrate de que la ruta sea correcta

const router = Router();

router.route('/lista')
    .get(usuarioController.getUsuarios);

router.route('/usuario')
    .post(usuarioController.createUsuario); // Cambia createUsuarios por createUsuario

router.post('/signup', usuarioController.signUp); // Registro de usuario

router.post('/signin', usuarioController.signIn); // Inicio de sesión de usuario

export default router;
