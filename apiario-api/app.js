import express from 'express';
import usuarioRutas from './routes/usuariorutas.js'; 
import inventarioRutas from './routes/inventariorutas.js';
import personasRutas from './routes/personarutas.js';
import apiarioRutas from './routes/apiariorutas.js';
import productorutas from './routes/productorutas.js';

const app = express();

// Middleware
app.use(express.json()); // Para parsear JSON en las peticiones

// Rutas públicas (Sin JWT)
app.use('/listav1/usuarios', usuarioRutas);
app.use('/listav1/inventarios', inventarioRutas);
app.use('/listav1/productos', productorutas);

// Rutas protegidas (Requieren JWT)
import { verifyToken } from './middlewares/verificarApiario.js';
app.use('/listav1/personas', verifyToken, personasRutas);
app.use('/listav1/apiarios', verifyToken, apiarioRutas);

const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
    console.log(`El servicio está corriendo en el puerto ${PUERTO}`);
});

export default app;
