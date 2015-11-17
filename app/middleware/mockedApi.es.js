'use strict';

import fs from 'fs';
import keys from 'lodash.keys';
import fetch from 'node-fetch';

const fixturePath = 'app/fixtures/';

const fixtures = {};

fs.readdir(fixturePath, (err, files) => {
    if (err) {
        console.log(`error reading fixtures: ${err}`);
    } else {
        files.forEach(file => {
            if (file.endsWith('json'))
                loadFile(file);
        });
    }
});

const loadFile = (file) => {
    fs.readFile(fixturePath + file, 'utf8', (err, data) => {
        if (err) {
            console.log(`error reading fixutre file ${file} with error ${err}`);
        } else {
            console.log(`adding mocked file ${file}`);
            fixtures[file] = JSON.parse(data);
        }
    });
}

const MockedAPI = (req, res, next) => {
    const params = req.params;
    const filename = `${params.hostname}:${params.endpoint}.${params.version}.${params.service}.json`

    if (fixtures[filename]) {
        res.data = fixtures[filename];
        console.log('hit cache');
        next();
    } else {
        let pathname = `http://${params.hostname}/${params.endpoint}/${params.version}/${params.service}?`;
        const keyset = [];
        keys(req.query).forEach(key => {
            keyset.push(`${key}=${req.query[key]}`);
            console.log(key, req.query[key]);
        });

        pathname += keyset.join('&');
        console.log(pathname);

        fetch(pathname).then(resp => {
            return resp.json();
        }).then(body => {
            let data = {};
            Object.assign(data, { 'proxied' : true }, body);
            res.data = data;
            fixtures[filename] = data;
            next();
        });
    }
};

module.exports = MockedAPI;

