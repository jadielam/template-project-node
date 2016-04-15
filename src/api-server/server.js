/**
 * Created by jadiel on 3/31/16.
 */
'use strict';

var createServerApp = require('./core/app');
var config = require('./core/config');

var app;

if (!config.isMissing) {
    app = createServerApp(config.server);
    app.listen(config.port, config.hostname, function() {

    });
}

module.exports = app;