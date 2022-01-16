const { schemaComposer, toInputObjectType } = require('graphql-compose');

//For Output
const Token = schemaComposer.createObjectTC({
    name: 'token',
    fields: {
        accessToken: 'String!',
        expiresIn: 'Int!'
    }
});

//For Input
const TokenITC = toInputObjectType(Token);

module.exports = {
    TokenITC,
    Token
};
