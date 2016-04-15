/**
 * Created by jadiel on 4/1/16.
 */

var restify = require('restify');

module.exports = function(app) {
    app.on('Not Found', function(req, res, err, cb) {
        res.send(new restify.NotFoundError('Requested URL was not found'));
        cb();
    });

    app.on('MethodNotAllowed', function(req, res, err, cb) {
        res.send(new restify.MethodNotAllowedError('Requested method is not allowed for this URL'));
        cb();
    });

    app.on('VersionNotAllowed', function(req, res, err, cb) {
        res.send(new restify.InvalidVersionError('Requested version is not allowed'));
        cb();
    });

    app.on('UnsupportedMediaType', function(req, res, err, cb) {
        res.send(new restify.UnsupportedMediaTypeError('Requested content-type is not supported'));
    });

    app.on('after', function(req, res, route, err) {
        //After all handlers were run.
    });

    app.on('uncaughtException', function(req, res, route, err) {

        req.log.err(err);
        if (!res.headersSent) {
            res.send(err);
        }
    });
}