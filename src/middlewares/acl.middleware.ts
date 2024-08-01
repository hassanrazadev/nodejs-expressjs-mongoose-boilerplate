import acl from 'express-acl';

acl.config({
    baseUrl: 'api',
    filename: 'acl.json',
    path: 'src/config',
    defaultRole: 'guest', // Set default role for users without a role
    decodedObjectName: 'user',
    roleSearchPath: 'user.role'
});

export default acl.authorize;

