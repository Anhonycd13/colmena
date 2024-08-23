import { DataTypes } from 'sequelize';
import sequelize from '../config/conexion.js'; // Asegúrate de que esta ruta sea correcta según tu estructura de carpetas

const Persona = sequelize.define('Persona', {
    id_persona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    dpi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true // asumiendo que este campo es único
    },
    Telefono: {
        type: DataTypes.DECIMAL(18, 0), // Según la descripción: numeric(9,18) que significa 18 dígitos
        allowNull: false
    },
    Correo: {
        type: DataTypes.STRING(255), // varchar(255)
        allowNull: false,
        unique: true, // asumiendo que el correo debe ser único
    },
    NIT: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true // asumiendo que este campo también es único
    },
    direccion: {
        type: DataTypes.STRING(255), // varchar(255)
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(255), // varchar(255)
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(255), // varchar(255)
        allowNull: false
    }
}, {
    tableName: 'Persona',
    timestamps: false
});

export default Persona;
