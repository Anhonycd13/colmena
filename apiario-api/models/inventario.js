import { DataTypes } from 'sequelize';
import sequelize from '../config/conexion.js';

const Inventario = sequelize.define('Inventario', {
    id_inventario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Egresos: {
        type: DataTypes.DECIMAL(18, 9), // Ajuste a las especificaciones de la columna Egresos
        allowNull: false
    },
    Ingresos: {
        type: DataTypes.DECIMAL(18, 9), // Ajuste a las especificaciones de la columna Ingresos
        allowNull: false
    },
    id_colmena: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Fecha: {
        type: DataTypes.DATEONLY, // Ajustado a la especificación de la columna Fecha
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Inventario',
    timestamps: false
});

export default Inventario;
