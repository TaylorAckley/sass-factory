'use strict';


let fs = require('fs');
let moment = require('moment');
let base64 = require('../lib/base64.module');

let ts = moment().format('YYY_MM_DD');
let _file = './tests/test.scss'
let _str = fs.readFileSync(_file, 'utf-8');


let assert = require('assert');
let chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

describe('base64FromString', () => {
    it('should be defined', () => {
        should.exist(base64.base64FromString());
    });
});