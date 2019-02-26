const Hapi = require('hapi');
const Path = require('path');

import login from './www/login'
import state from './www/state'
import area from './www/area'
import center from './www/center'
import batch from './www/batch'

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

//db connection established
const db = require('../database').db;


// validation function
const validate = async function (user, decoded, request) {
    // checks to see if the person is valid
    if (!user['_id']) {
        return { isValid: false };
    }
    else {
        return { isValid: true };
    }
};


const init = async () => {
    //creating a server
    const server = new Hapi.Server({
        port: 8000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '/public')
            }
        }
        // routes: { cors: true }
    });
    const swaggerOptions = {
        info: {
            title: 'Test API Documentation'
        },
    };

    // register hapi swagger documentation
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    // cookie
    await server.register(require('hapi-auth-cookie'));
      server.auth.strategy('token', 'cookie',
      {
        ttl: 24 * 60 * 60 * 1000,
        password: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',
        cookie: 'token',
        isSecure: false 
      });

    //register hapi-auth-jwt2 for authentication
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt',
        {
            key: 'vZiIpmTzqXHp8PpYXTwqc9SRQ1UAyAfC',
            validate: validate,
            verifyOptions: { algorithms: ['HS256'] }
        });

    //registering all routes
    server.route(state);
    server.route(login);
    server.route(area);
    server.route(center);
    server.route(batch);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './',
                redirectToSlash: true,
                index: true,
            }
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
