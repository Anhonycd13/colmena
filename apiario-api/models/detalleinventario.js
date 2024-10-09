// models/detalleInventario.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/conexion.js';

const DetalleInventario = sequelize.define('DetalleInventario', {
    id_detalle_inventario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_detalle_inventario'
    },
    id_inventario: {
        type: DataTypes.INTEGER,
        field: 'id_inventario'
    },
    id_Producto: {
        type: DataTypes.INTEGER,
        field:'id_Producto'
    },
    cantidad: {
        type: DataTypes.INTEGER,
        field:'cantidad'
    }
}, {
    tableName: 'detalle_inventario',
    timestamps: false,
     schema: 'dbo'
});

export default DetalleInventario;