'use strict';

let Compiler = require('./lib/compiler.module');
let base64 = require('./lib/base64.module');


module.exports.base64FromString = base64.base64FromString;
module.exports.base64FromFile = base64.base64FromFile;

module.exports = Compiler;