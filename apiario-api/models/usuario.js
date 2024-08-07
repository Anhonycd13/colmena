import { DataTypes } from 'sequelize';
import sequelize from '../config/conexion.js';

const Usuario = sequelize.define('Usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_usuario'
    },
    correo: {
        type: DataTypes.STRING(255),
        field: 'Correo'
    },
    contraseña_hash: {
        type: DataTypes.BLOB, // Utiliza BLOB para varbinary
        field: 'contraseña_hash'
    },
    nombre: {
        type: DataTypes.STRING(255),
        field: 'Nombre'
    },
    rol: {
        type: DataTypes.STRING(255),
        field: 'rol'
    },
    tipo: {
        type: DataTypes.INTEGER, // Utiliza INTEGER para int
        field: 'Tipo'
    }
}, {
    timestamps: false,
    tableName: 'Usuario',
    schema: 'dbo'  // Usa el nombre correcto del esquema
});

export default Usuario;
