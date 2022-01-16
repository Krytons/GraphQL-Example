const {SchemaComposer} = require('graphql-compose');
const { UserQuery, UserMutation } = require('./user');

//Define a new schema composer
const schemaComposer = new SchemaComposer();

//Add all queries
schemaComposer.Query.addFields({
    ...UserQuery,
});

//Add all mutations
schemaComposer.Mutation.addFields({
    ...UserMutation,
});

module.exports = schemaComposer.buildSchema();