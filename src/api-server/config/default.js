/**
 * Created by jadiel on 4/1/16.
 */
'use strict';

module.exports = {

    port: 8625,

    hostname: '0.0.0.0',

    server: {
        name: 'Financial Manager'
    },

    basePath: '/actions/api/v1',

    CORS: {

    },

    gzip: true,

    bodyParser: {
        maxBodySize: 10 * 1000000,  //10 MB
        mapParams: false,
        mapFiles: false,
        overrideParams: false
    },

    throttle: false,

    logasaurus: {
        logFile: true,
        logPath: './log',
        consoleLog: true
    },

    apiSecurity: {
        csrf: {}
    },

    lusca: {
        hsts: {
            maxAge: 31536000,
            includeSubDomain: true
        }
    }
};