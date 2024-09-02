import { DataTypes } from 'sequelize';
import sequelize from '../config/conexion.js';

const Persona = sequelize.define('Persona', {
    idPersona: {                                        
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_persona'        
    },
    dpi: {
        type: DataTypes.INTEGER,
        field: 'Dpi' 
    },
    Telefono: {
        type: DataTypes.NUMERIC(18, 0),
        field: 'Telefono' 
    },
    Correo: {
        type: DataTypes.STRING(255),
        field: 'Correo' 
    },
    NIT: {
        type: DataTypes.INTEGER,
        field: 'NIT' 
    },
    direccion: {
        type: DataTypes.STRING(255),
        field: 'Direccion' 
    },
    nombre: {
        type: DataTypes.STRING(255),
        field: 'Nombre' 
    },
    apellido: {
        type: DataTypes.STRING(255),
        field: 'Apellido' 
    }
}, {
    
    timestamps: false,
    tableName: 'Persona',
    schema: 'dbo'
});

export default Persona;