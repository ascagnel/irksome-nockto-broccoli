'use strict';

import weather from '../../middleware/weather.es.js';

const Weather = router => {
    router.all('*', weather, (req, res) => {
        res.send(res.data);
    });
};

module.exports = Weather;
