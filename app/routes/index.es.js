"use strict";

import weather from "../middleware/weather.es.js";

const Root = router => {
    /*
    router.get('/weather', weather, (req, res) => {
        res.send(res.data);
    });
    */

    router.get('/', (req, res) => {
        res.send("Hello, World!");
    });
};

module.exports = Root;
