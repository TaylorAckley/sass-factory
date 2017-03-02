'use strict';

require('dotenv').config();

let fs = require('fs');
let moment = require('moment');

let ts = moment().format('YYY_MM_DD');
let _buffer = fs.readFileSync('./tests/test.scss', 'utf-8');
let _scaffold = {
    src: {
        bucket: 'ka-files',
        key: 'test.scss',
    },
    tpl: _buffer,
    opts: {
        color1: "#000",
        color2: "#FFF"
    },
    out: {
        bucket: 'ka-files',
        key: `${ts}_compiled.css`
    }

};

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
        it('should not require an argument', (done) => {
            let _opts = {
                tpl: _scaffold.tpl,
                opts: _scaffold.opts
            };
            let c = new Compiler(_opts);
            should.exist(c.compile());
            done();
        });
        it('should return a buffer', (done) => {
            console.log('waypoint');
            let _opts = {
                tpl: _scaffold.tpl,
                opts: _scaffold.opts
            };
            let c = new Compiler(_opts);
            c.compile(_opts)
                .then((res) => {
                    res.min.should.be.a('string');
                    res.dev.should.be.a('string');
                    should.exist(res.metadata);
                    done();
                })
                .catch((err) => console.log(err));
        });

    });



});