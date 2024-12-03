import { DataTypes } from 'sequelize';
import sequelize from '../config/conexion.js';
import Apiario from './apiario.js'; // Importa aquí

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
        type: DataTypes.BLOB,
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
        type: DataTypes.INTEGER,
        field: 'Tipo'
    },
    idApiario: {
        type: DataTypes.INTEGER,
        field: 'id_apiario'
    }
}, {
    timestamps: false,
    tableName: 'Usuario',
    schema: 'dbo'
});

// Definir la relación aquí
Usuario.belongsTo(Apiario, {
    foreignKey: 'id_apiario',
    targetKey: 'id_apiario'
});

export default Usuario;