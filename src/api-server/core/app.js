/**
 * Created by jadiel on 3/31/16.
 */
'use strict';

var restify = require('restify');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var lusca = require('lusca');

var cookieParser = require('restify-cookies');
var config = require('./config');
var errorHandler = require('./error-handler');
var initRoutes = require('./init-routes');

module.exports = function(serverCfg) {
    serverCfg = serverCfg || {};
    var app = createServer(serverCfg);
    
    errorHandler(app);
    app.pre(restify.pre.sanitizePath());

    if (config.CORS) {
        app.pre(restify.CORS(config.CORS));
        app.pre(restify.fullResponse());
    }

    if (config.gzip) {
        app.use(restify.gzipResponse());
    }

    if (config.throttle) {
        app.use(restify.throttle(config.throttle));
    }

    app.use(lusca.hsts(config.lusca.hsts));
    app.use(restify.acceptParser(app.acceptable));
    app.use(restify.bodyParser(config.bodyParser));
    app.use(restify.queryParser({mapParams: false}));
    app.use(cookieParser.parse);

    initRoutes(app, {});
    return app;

}

function createServer(serverCfg) {
    if (serverCfg.certFile) {
        serverCfg.certificate = fs.readFileSync(
            path.join(__dirname, '../config', serverCfg.certFile), {encoding: 'utf8'}
        );
    }

    if (serverCfg.keyFile) {
        server.key = fs.readFileSync(
            path.join(__dirname, '../config', serverCfg.keyFile, {encoding: 'utf8'})
        );
    }

    return restify.createServer(serverCfg);
}
