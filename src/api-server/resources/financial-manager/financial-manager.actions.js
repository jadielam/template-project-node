/**
 * Created by jadiel on 4/1/16.
 */

var _ = require('lodash');
var restify = require('restify');
var config = require('../../core/config');
var validation = require('../dao/validation');
var dao = require('../mongo-dao');

module.exports = {
    v1: {
        test: test,
    }
};

function test(req, res, next) {
    res.send("Hello world!");
    return next();
}
