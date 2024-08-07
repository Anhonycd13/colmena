/*import { Sequelize } from 'sequelize';
import tedious from 'tedious';

const sequelize = new Sequelize('Colmena', 'apiario', 'admin1234', {
    //host: '192.168.225.160', //telefono
    host:'192.168.0.101', // casa
    port: 1433, // Especifica el puerto y recordar habilitar cuando se cambie de ip
    dialect: 'mssql',
    dialectModule: tedious,
    dialectOptions: {
        connectString:'192.168.0.101:1433/expres'
    }
});
const sequelize = new Sequelize('Colmena', 'apiario', 'admin1234', {
    host: '192.168.0.101\\EXPRES', // usa el nombre de la instancia
    dialect: 'mssql',
    dialectModule: tedious,
    dialectOptions: {
        // Omitir connectString si se usa el nombre de instancia en el host
    }
});

export default sequelize;*/
import { Sequelize } from 'sequelize';
import tedious from 'tedious';

const sequelize = new Sequelize('ColmenaB2', 'sa', 'admin1234', {
    //host: '192.168.225.160\\SQLEXPRESS', // Dirección IP del servidor SQL
       host: '192.168.0.101\\SQLEXPRESS', // Ejemplo: '192.168.0.101\\SQLEXPRESS'
        dialect: 'mssql',
        dialectModule: tedious,
        dialectOptions: {
            options: {
                encrypt: false,
                trustServerCertificate: true
            }
        }
    });
    

export default sequelize;


