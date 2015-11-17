"use strict";

import weather from "../middleware/weather.es.js";
import mockedApi from "../middleware/mockedApi.es.js";

const Root = router => {
    router.get('/weather', weather, (req, res) => {
        res.send(res.data);
    });

    router.get('/mocked-api/:hostname/:endpoint/:version/:service', mockedApi, (req, res) => {
        let data = {};
        Object.assign(data, { source: 'localhost' }, res.data);
        res.send(data);
    });

    router.get('/', (req, res) => {
        res.send("there's nothing here!");
    });
};

module.exports = Root;
