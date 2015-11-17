"use strict";

import express from 'express';
import enrouten from 'express-enrouten';
import config from './config.es.js';
import nock from 'nock';

const nockBack = nock.back;
const app = express();

app.use(enrouten(config.expressConfig));
global.config = config.appConfig;

console.log(`nocked? ${global.nocked}`);
nockBack.fixtures = '../fixtures';

if (global.nocked) {
    nockBack.setMode('lockdown');
} else {
    nockBack.setMode('record');
}

const server = app.listen(3000, () => {
    const port = server.address().port;

    console.log(`App up and listening on port ${port}`);
});
