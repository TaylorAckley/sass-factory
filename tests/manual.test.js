'use strict';

let Compiler = require('../lib/compiler.module');
let fs = require('fs');
require('dotenv').config();

let opts = {
    tpl: "Ym9keSB7DQogICAgZm9udC1mYW1pbHk6ICdNZXJyaXdlYXRoZXInLCBzZXJpZjsNCn0NCg0KaDEsDQpoMiwNCmgzLA0KaDQsDQpoNSwNCmg2IHsNCiAgICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7DQogICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsNCn0NCg0KcHJlIHsNCiAgICBmb250LWZhbWlseTogQ29uc29sYSwgbW9ub3NwYWNlOw0KICAgIGNvbG9yOiAke2NvbG9yMX07DQogICAgd2hpdGUtc3BhY2U6IHByZTsNCn0NCg0KLnNwYWNlci1zbSB7DQogICAgbWFyZ2luLWJvdHRvbTogMTVweDsNCn0NCg0KLmxvYWRpbmctc2VjdGlvbiB7DQogICAgZGlzcGxheTogYmxvY2s7DQogICAgcGFkZGluZy10b3A6IDE1MHB4Ow0KfQ==",
    opts: {
        color1: "#000"
    }

};

let opts2 = {
    src: {
        key: 'test.scss',
        bucket: 'ka-files'
    },
    opts: {
        color1: "#000",
        color2: "#FFF"
    }

};

let opts3 = {
    src: {
        key: 'test.scss',
        bucket: 'ka-files'
    },
    opts: {
        color1: "#000",
        color2: "#FFF"
    },
    out: {
        key: 'compiled.css',
        bucket: 'ka-files'
    }

};

let c = new Compiler(opts3);

c.compile()
    .then((res) => {
        fs.writeFile('./tests/result.json', JSON.stringify(res), 'utf-8');
    })
    .catch((err) => console.log(err));