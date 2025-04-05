import jwt from 'jsonwebtoken';
import palsecret from '../palsecret.js'; // La clave secreta para firmar el JWT

// Middleware para verificar la autenticación y el rol
export const verifyToken = (roles = []) => {
    return async (req, res, next) => {
        // Obtener el token del header de autorización
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Acceso denegado: Token no proporcionado' });
        }

        try {
            // Verificar el token JWT
            const decoded = jwt.verify(token, palsecret.SECRET);
            req.user = decoded; // Guardar la información del usuario decodificado

            // Si el token está presente, verificamos el rol
            if (roles.length && !roles.includes(decoded.roles)) {
                return res.status(403).json({ message: 'Acceso denegado: No tienes permisos para esta acción' });
            }

            // Si todo es correcto, continuamos con la ejecución de la siguiente función
            next();
        } catch (error) {
            res.status(401).json({ message: 'Acceso denegado: Token inválido', error });
        }
    };
};
