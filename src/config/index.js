import dotenv from 'dotenv';
dotenv.config();

export default {
  env: process.env.NODE_ENV || 'test',
  port: process.env.PORT || '5000',
  API_VERSION: process.env.API_VERSION || '0.1.0',
  hash_key: process.env.HASH_KEY || '',
  application_name: process.env.APPLICATION_NAME || 'voting_micro_service',
  version: process.env.VERSION || '1.0',
  AWS_JWT_PREFIX: process.env.AWS_JWT_PREFIX || '',
  JWT_HASH_KEY: process.env.JWT_HASH_KEY || '',  
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID || '',
  AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION || '',
  AWS_COGNITO_JWT_KEY1: process.env.AWS_COGNITO_JWT_KEY1 || {},
  AWS_COGNITO_JWT_KEY2: process.env.AWS_COGNITO_JWT_KEY2 || {},
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
  chain_name: process.env.CHAIN_NAME || '',
  chain_service_name: process.env.CHAIN_SERVICE || '',
  voting_service_url: process.env.VOTING_SERVICE_URL || '', 
  api_header_token: process.env.API_EXTERNAL_TOKEN || '',
  propose_delay: process.env.PROPOSE_DELAY || '',
  price_setting : process.env.PRICE_SETTING || '',
  agrosTokenContractAddress: process.env.AGROS_TOKEN_ADDRESS || '',
  agrosAdminAddress: process.env.AGROS_ADMIN_ADDRESS || '',
  agrosAdminPrivateKey: process.env.AGROS_ADMIN_PRIVATE_KEY || '',
  agroStructureContractAddress: process.env.AGROS_ROLE_ADDRESS || '',
  agrosMemberRoleId: process.env.MEMBER_ROLE_ID || '', 
  agrosLeaderRoleId: process.env.LEADER_ROLE_ID || '', 
  agrosProducerRoleId: process.env.PRODUCER_ROLE_ID || '', 
  agrosOrganizationRoleId: process.env.ORGANIZATION_ROLE_ID || ''
  
};