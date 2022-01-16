const {UserTC, User} = require('../models/user');
const {LoginResolver, SigninResolver} = require('../resolvers/user');
const {isAuth} = require('../middlewares/auth');

//Add custom resolvers
UserTC.addResolver(LoginResolver(UserTC, User));
UserTC.addResolver(SigninResolver(UserTC, User));

var requireAuthentication = function (resolvers) {
    Object.keys(resolvers).forEach((k) => {
        resolvers[k] = resolvers[k].wrapResolve((next) => async (rp) => {
            isAuth(rp.context.res);
            return next(rp);
        });
    });
    return resolvers;
};

//Queries
const UserQuery = {
    login: UserTC.getResolver('login'),
    userById: UserTC.getResolver('findById'),
    userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne'),
    userMany: UserTC.getResolver('findMany'),
    userCount: UserTC.getResolver('count'),
    userConnection: UserTC.getResolver('connection'),
    userPagination: UserTC.getResolver('pagination')
};

//Mutations
const UserMutation = {
    signin: UserTC.getResolver('signin'),
    ...requireAuthentication({
        userCreateOne: UserTC.getResolver('createOne'),
        userCreateMany: UserTC.getResolver('createMany'),
        userUpdateById: UserTC.getResolver('updateById'),
        userUpdateOne: UserTC.getResolver('updateOne'),
        userUpdateMany: UserTC.getResolver('updateMany'),
        userRemoveById: UserTC.getResolver('removeById'),
        userRemoveOne: UserTC.getResolver('removeOne'),
        userRemoveMany: UserTC.getResolver('removeMany')
    })
};


module.exports = { UserQuery, UserMutation };