import express from 'express';
import usuarioRutas from './routes/usuariorutas.js'; // Verifica la ruta

const app = express();

app.use(express.json());
app.use('/listav1', usuarioRutas); // Rutas bajo el prefijo '/listav1'

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`El servicio está corriendo en el puerto ${PORT}`);
});

export default app;
