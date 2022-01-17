const { schemaComposer } = require('graphql-compose');
const debug = require('debug')('app:models:utilities:healthcheck');

//For Output
const HealthCheckTC = schemaComposer.createObjectTC({
    name: 'healthCheck',
    fields: {
        status: 'Boolean!'
    }
});

const HealthCheckResolver = schemaComposer.createResolver({
    kind: 'query',
    name: 'healthCheck',
    args: {},
    type: HealthCheckTC,
    resolve: async ({ args, context }) => {
        debug("Executing healthCheck service");
        return {
            status : true
        }    
    }
});

HealthCheckTC.addResolver(HealthCheckResolver);

module.exports = {
    HealthCheckTC
}
