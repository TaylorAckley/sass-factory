'use strict';
let fs = require('fs');

function base64FromFile(file) {
    // read binary data
    let bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function base64FromString(str) {
    return new Buffer(str).toString('base64');
}

module.exports.base64FromString = base64FromString;

module.exports.base64FromFile = base64FromFile;