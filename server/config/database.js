const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';
const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

const connectionConfig = hasDatabaseUrl
    ? process.env.DATABASE_URL
    : {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 5432)
    };

const sequelize = new Sequelize(connectionConfig, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    ...(isProduction
        ? {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
        : {})
});

module.exports = sequelize;
