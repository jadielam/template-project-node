/**
 * Created by jadiel on 4/1/16.
 */

var restify = require('restify');
var config = require('../../core/config');
var financialManager = require('./financial-manager.actions.js');

module.exports = function initRoutes(server) {
    var app = server;

    var basePath = config.basePath;

    app.get({path: basePath + '/test', version: '1.0.0'}, financialManager.v1.test);

};