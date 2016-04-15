/**
 * Created by jadiel on 4/1/16.
 */

'use strict';

var path = require('path');
var fs = require('fs');
var config = {isMissing: true};

var configDir = path.join(__dirname, '../config');
var configPath = path.join(configDir, 'default.js');

config = require(configPath);

module.exports = config;