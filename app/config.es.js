"use strict";

import nock from "nock";
import includes from "lodash.includes";

global.nocked = includes(process.argv, 'nocked');

const expressConfig = {
    index: 'routes/index.es.js',
    directory: 'routes/'
};

const appConfig = {
    weatherHost: (global.nocked ? 'localhost:3000/mocked-api/api.openweathermap.org' : 'api.openweathermap.org')
};

module.exports = {appConfig, expressConfig};

