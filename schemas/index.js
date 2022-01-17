const {SchemaComposer} = require('graphql-compose');
const { UserQuery, UserMutation } = require('./user');
const {HealthCheckTC} = require('../models/utilities/healthcheck');

//Define a new schema composer
const schemaComposer = new SchemaComposer();

//Add all queries
schemaComposer.Query.addFields({
    ...UserQuery,
    healthCheck: HealthCheckTC.getResolver('healthCheck'),
});

//Add all mutations
schemaComposer.Mutation.addFields({
    ...UserMutation,
});

module.exports = schemaComposer.buildSchema();