/**
 * Created by jadiel on 4/1/16.
 */
'use strict';

var path = require('path');
var glob = require('glob');
var _ = require('lodash');

module.exports = initNodeRoutes;

function initNodeRoutes(app, options) {
    options = _.merge({
        resourceDir: path.join(path.dirname(module.parent.filename), '..', 'resources'),
        filePattern: '**/*.routes.js',
        globOpts: null,
        logger: null,
        resourceFn: null,
        resourceFnParams: [app],
    }, options);

    var globOpts = _.merge({
        nocase: true
    }, options.globOpts, {
        nodir: true,
        cwd: options.resourceDir
    });

    var routesFiles = glob.sync(options.filePattern, globOpts);

    routesFiles.forEach(routeProcessor);

    function routeProcessor(routesFile) {
        if (options.logger) {
            options.logger('Processing routes file: ' + routesFile);
        }

        routesFile = path.join(options.resourceDir, routesFile);

        var resource = require(routesFile);

        if (options.resourceFn) {
            if (_.isFunction(resource)) {
                resource = resource.apply(resource, options.resourceFnParams);
            }

            resource[options.resourceFn].apply(resource, options.resourceFnParams);
        }
        else {
            resource.apply(resource, options.resourceFnParams);
        }
    }
}