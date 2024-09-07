import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Ajusta la ruta según tu configuración

const Producto = sequelize.define('Producto', {
  id_Producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_Producto'
  },
  id_inventario: {
    type: DataTypes.INTEGER,
    field: 'id_inventario'
  },
  Nombre: {
    type: DataTypes.STRING(255),
    field: 'Nombre'
  },
  Precio: {
    type: DataTypes.DECIMAL(18, 2),
    field: 'Precio'
  },
  Stock: {
    type: DataTypes.INTEGER,
    field: 'Stock'
  },
  id_apiario: {
    type: DataTypes.INTEGER,
    field: 'id_apiario'
  }
}, {
  tableName: 'Producto',
  timestamps: false, // Asume que no tienes campos de timestamp en tu tabla
  schema: 'dbo'
});

export default Producto;
