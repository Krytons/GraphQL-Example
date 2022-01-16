const debug = require('debug')('app');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const {graphqlHTTP} = require ('express-graphql');
const { HOST, DB_NAME, PORT } = require('./env');
const schemas = require('./schemas');


//Database connection, using mongoose
debug('Database connection is running');
mongoose.connect(`mongodb://${HOST}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => {
    debug(`Connection refused: ${error}`);
    process.exit(1);
});
db.once('open', () => {
    debug('DB connection Ready');
});

//Express app setup
debug('App setup is running');
const app = express(); 
app.listen(normalizePort(PORT));

//Enable Cors
app.use(cors());
//Enable Helmet
//app.use(helmet());

//Single endpoint setup
app.use('/graphql', graphqlHTTP((req) => {
        return {
            contex: {startTime: Date.now()},
            graphiql: true,
            schema: schemas
        }
    })
);

//Function to normalize Port value
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) return val;
    if (port >= 0) return port;

    return false;
}