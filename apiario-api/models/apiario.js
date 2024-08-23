import { DataTypes } from 'sequelize';
import sequelize from '../config/conexion.js';

const Apiario = sequelize.define('Apiario', {
    id_apiario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    municipio: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_persona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'persona',
            key: 'id_persona'
        }
    },
    Nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    contraseña_hash: {
        type: DataTypes.BLOB, // Asumiendo que 'contraseña_hash' es binario
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario', // Asegúrate de que el modelo 'Usuario' está definido
            key: 'id_usuario'
        }
    }
}, {
    tableName: 'Apiario',
    timestamps: false
});

export default Apiario;
