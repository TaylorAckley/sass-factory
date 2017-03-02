'use strict';

const _ = require('lodash');
const S3 = require('lazy-s3');
const sass = require('node-sass');
const Promise = require('bluebird');

class Compiler {
    constructor(_opts) {
        this.opts = _opts;
        this.opts.tpl = _opts.tpl || undefined;
        this.opts.opts = _opts.opts || undefined;
        this.opts.src = _opts.src || undefined;
        this.opts.out = _opts.out || undefined;
        this.exp = new RegExp(/^.*\.(scss|css)$/ig);
    }
    compile() {
        return new Promise((resolve, reject) => {
            this.get()
                .then((_rawTpl) => {
                    this.template(_rawTpl)
                        .then((_tpl) => {
                            this.sass(_tpl)
                                .then((_payload) => {
                                    this.out(_payload)
                                        .then((res) => {
                                            resolve(res);
                                        })
                                        .catch((err) => reject(err));
                                })
                                .catch((err) => reject(err));
                        });
                })
                .catch((err) => reject(err));
        });
    }
    template(_rawTpl) {
        return new Promise((resolve, reject) => {
            if (!this.opts.opts) {
                resolve(_rawTpl); // No options were passed to interpolate.   Looks like we're just going to compile the sass.  #sadtrombone
            }
            let buf = new Buffer(_rawTpl, 'base64').toString('utf-8');
            let _tpl = _.template(buf);
            resolve(_tpl(this.opts.opts));
        });

    }
    sass(_tpl) {
        return new Promise((resolve, reject) => {
            let result = sass.renderSync({
                data: _tpl
            }, (err) => reject(err));
            let resultMin = sass.renderSync({
                data: _tpl,
                outputStyle: 'compressed'
            }, (err) => reject(err));
            let _payload = {
                dev: result.css,
                min: resultMin.css
            };
            resolve(_payload);
        });
    }
    get() {
        return new Promise((resolve, reject) => {
            if (this.opts.tpl) {
                resolve(this.opts.tpl);
            }
            let _bucket = this.opts.src.bucket || process.env.AWS_BUCKET;
            if (!_bucket) {
                reject('No bucket provided');
            }
            let s3 = new S3();
            s3.download(this.opts.src.key, _bucket)
                .then((res) => {
                    resolve(res.Body);
                    //let _res = new Buffer(res, 'utf-8')
                })
                .catch((err) => reject(err));
        });
    }
    out(payload) {
        return new Promise((resolve, reject) => {
            let _res = {
                metadata: {
                    content: 'utf-8',
                    encoding: 'base64'
                }
            };
            let _min = new Buffer(payload.min, 'utf-8');
            let _dev = new Buffer(payload.dev, 'utf-8')
            if (!this.opts.out) {
                _res.dev = new Buffer(_dev, 'utf-8').toString('base64');
                _res.min = new Buffer(_min, 'utf-8').toString('base64');
                resolve(_res);
            } else {
                console.log('Waypoint 97 ' + this.opts.out.key);
                let _keyRaw = this.opts.out.key;
                let _key = _keyRaw.replace(/^.*\.(scss|css)$/ig, '');
                console.log('Waypoint 100 ' + _key);
                console.log('Waypoint 101 ' + _keyRaw.replace(/^.*\.(scss|css)$/gi, ''));
                console.log('Waypoint 102 ' + _keyRaw.match(/^.*\.(scss|css)$/gi));
                let s3 = new S3();
                let _bucket = this.opts.out.bucket || process.env.AWS_BUCKET;
                s3.upload(_min, `${_key}.min.css`, 'text/css', _bucket)
                    .then((res) => {
                        _res.min = res;
                        s3.upload(_dev, `${_key}.css`, 'text/css', _bucket)
                            .then((res) => {
                                _res.dev = res;
                                resolve(_res);
                            })
                    })
                    .catch((err) => console.log(err));
            }
        });
    }
}

module.exports = Compiler;