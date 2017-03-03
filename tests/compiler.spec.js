'use strict';

require('dotenv').config();

let fs = require('fs');
let moment = require('moment');
let base64 = require('../lib/base64.module');

let ts = moment().format('YYY_MM_DD');
let _buffer = fs.readFileSync('./tests/test.scss', 'utf-8');

let _scaffold = {
    src: {
        bucket: 'ka-files',
        key: 'test.scss',
    },
    tpl: 'Ym9keSB7DQogICAgZm9udC1mYW1pbHk6ICdNZXJyaXdlYXRoZXInLCBzZXJpZjsNCn0NCg0KaDEsDQpoMiwNCmgzLA0KaDQsDQpoNSwNCmg2IHsNCiAgICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7DQogICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsNCn0NCg0KcHJlIHsNCiAgICBmb250LWZhbWlseTogQ29uc29sYSwgbW9ub3NwYWNlOw0KICAgIGNvbG9yOiAke2NvbG9yMX07DQogICAgd2hpdGUtc3BhY2U6IHByZTsNCn0NCg0KLnNwYWNlci1zbSB7DQogICAgbWFyZ2luLWJvdHRvbTogMTVweDsNCn0NCg0KLmxvYWRpbmctc2VjdGlvbiB7DQogICAgZGlzcGxheTogYmxvY2s7DQogICAgcGFkZGluZy10b3A6IDE1MHB4Ow0KfQ==',
    opts: {
        color1: "#000",
        color2: "#FFF"
    },
    out: {
        bucket: 'ka-files',
        key: `${ts}_compiled.css`
    }

};

console.log(_scaffold.tpl);

let assert = require('assert');
let chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

let env = process.env;
describe('env vars', () => {
    it(' should be defined and strings', () => {
        env.AWS_ACCESS_KEY_ID.should.be.a('string');
        env.AWS_SECRET_ACCESS_KEY.should.be.a('string');
        env.AWS_BUCKET.should.be.a('string');
    });
});


let Compiler = require('../index.js');

/*
should.equal
should.be.a.('string')
should.have.property('').equals('')
should.exist
*/

describe('Compiler', (done) => {

    describe('constructor', (done) => {
        it('should return a buffer', (done) => {
            let _opts = {
                tpl: _scaffold.tpl,
                opts: _scaffold.opts
            };
            let c = new Compiler(_opts);
            c.compile()
                .then((res) => {
                    console.log('waypoint 4');
                    res.min.should.be.a('string');
                    res.dev.should.be.a('string');
                    should.exist(res.metadata);
                    done();
                })
                .catch((err) => console.log(err));
        });
    });



});