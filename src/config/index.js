import dotenv from 'dotenv';
dotenv.config();

export default {
  env: process.env.NODE_ENV || 'test',
  port: process.env.PORT || '5000',
  API_VERSION: process.env.API_VERSION || '0.1.0',
  hash_key: process.env.HASH_KEY || '',
  application_name: process.env.APPLICATION_NAME || 'health_microservice',
  version: process.env.VERSION || '1.0',
  postgresURI: {
    host: process.env.PG_DB_HOST || '',
    port: parseInt(process.env.PG_DB_PORT?.toString() || ''),
    database: process.env.PG_DB_DATABASE || '',
    username: process.env.PG_DB_USERNAME || '',
    password: process.env.PG_DB_PASSWORD || '',
    dialect: process.env.PG_DB_DIALECT || ''
  },
  network: {
    network: process.env.NETWORK || '',
    registry: process.env.REGISTRY || '',
    rpcUrl: process.env.RPC_URL || ''
  },
  hash_key : process.env.HASH_KEY,
  price_setting : process.env.PRICE_SETTING || '',
  not_history : process.env.NOT_HISTORY,
  scAdminAddress: process.env.SC_ADMIN_ADDRESS || '',
  scAdminPrivateKey: process.env.SC_ADMIN_PRIVATE_KEY || '',
  scHealthRoleaddress: process.env.SC_HEALTH_ROLE_ADDRESS || '', 
  scHealthStoreaddress: process.env.SC_HEALTH_STORE_ADDRESS || ''  
};