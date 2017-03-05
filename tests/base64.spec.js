'use strict';


let fs = require('fs');
let base64 = require('../lib/base64.module');

let ts = moment().format('YYY_MM_DD');
let _file = './tests/test.scss';
let _str = fs.readFileSync(_file, 'utf-8');
console.log(_str);
let _check = 'JGNvbG9yMzogcmVkOw0KDQpwIHsNCmNvbG9yOiAke2NvbG9yMX07DQp9DQoNCi5oZWFkaW5nIHsNCmZvbnQtc2l6ZTogMTJweDsNCmNvbG9yOiAke2NvbG9yMn07DQp9DQoNCi5yZWQgew0KICAgIGNvbG9yOiAkY29sb3IzOw0KfQ==';


let assert = require('assert');
let chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

describe('base64FromString', () => {
    it('should be defined', () => {
        should.exist(base64.base64FromString);
    });
    it('should return a base64 string', () => {
        let res = base64.base64FromString(_str);
        let test = base64regex.test(res);
        console.log(test);
        test.should.be.true;
    });
});

describe('base64FromFile', () => {
    it('should be defined', () => {
        should.exist(base64.base64FromFile);
    });
    it('should return a base64 string', () => {
        let res = base64.base64FromFile(_file);
        let test = base64regex.test(res);
        console.log(test);
        test.should.be.true;
    });
});