/**
 * Created by jadiel on 4/8/16.
 */

'use strict';

var deasync = require('deasync');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://172.17.0.2:27017/financialmanager';

module.exports = {
    getFinancialManagerDatabase: getFinancialManagerDatabase,
}

function getFinancialManagerDatabase() {
    var db;

    MongoClient.connect(url, function(err, database) {
        if (!err) {
            db = database;
        }
        else {
            db = null;
        }
    });

    while(db === undefined) {
        deasync.sleep(100);
    }

    if (db !== null) {
        return db;
    }
    else {
        throw 'Could not connect to MongoDB database at ' + url;
    }

}
