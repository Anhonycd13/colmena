import express from 'express';
import usuarioRutas from './routes/usuariorutas.js'; // Verifica la ruta
import inventarioRutas from './routes/inventariorutas.js';
import personasRutas from './routes/personarutas.js';
import apiarioRutas from './routes/apiariorutas.js';
import productorutas from './routes/productorutas.js';

const app = express();

app.use(express.json());

app.use('/listav1', usuarioRutas); // Rutas bajo el prefijo '/listav1'
app.use('/listav1', inventarioRutas);
app.use('/listav1', personasRutas);
app.use('/listav1', apiarioRutas);
app.use('/listav1', productorutas);

const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
    console.log(`El servicio está corriendo en el puerto ${PUERTO}`);
});


export default app;
