const debug = require('debug')('app:config:env');
const dotenv = require('dotenv');
dotenv.config();

debug('Loading environment');

const env = name => process.env[name.toUpperCase()];


module.exports = {

    NODE_ENV: env('node_env') || 'development',

    HOST: env('host') || 'localhost',

    DB_NAME: env('db_name') || 'graphQL_DB',

    PORT: env('port') || 3000,

    JWT_SECRET: env('jwt-secret') || 'secret',

    JWT_EXPIRES_STRING: env('jwt-expires') || '1d',

    JWT_EXPIRES_HOURS: env('jwt-expires') || '24',

    MAIL_SERVICE: env('mail_service') || 'smtp.gmail.com',

    MAIL_HOST: env('mail_host') || 'gmail',

    MAIL_USER: env('mail_user'),

    MAIL_PASSWORD: env('mail_password')

};