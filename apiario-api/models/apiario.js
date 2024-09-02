import { DataTypes } from 'sequelize';
import sequelize from '../config/conexion.js';

const Apiario = sequelize.define('Apiario', {
    id_apiario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_apiario'
    },
    Descripcion: {
        type: DataTypes.STRING(255),
        field: 'descripcion'
    },
    municipio: {
        type: DataTypes.STRING(255),
        field: 'Municipio'
    },
    direccion: {
        type: DataTypes.STRING(255),
        field: 'Direccion'
    },
    Nombre: {
        type: DataTypes.STRING(255),
        field: 'nombre'
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'estado'
    },
    contraseña_hash: {
        type: DataTypes.BLOB, // Mantén BLOB para datos binarios
        field: 'contraseña_hash'
    }
}, {
    tableName: 'Apiario',
    timestamps: false,
    schema: 'dbo'
});

export default Apiario;
