'use strict';

import fetch from "node-fetch";

const cityId = '2172797';
const appId = '2de143494c0b295cca9337e1e96b00e0';

const weather = (req, res, next) => {
    const hostname = global.config.weatherHost;
    let id = cityId;

    if (req.query.city) {
        id = req.query.city;
    }

    const path = `http://${hostname}/data/2.5/weather?id=${id}&appid=${appId}`;
    console.log(`Getting weather data from ${path}`);
    fetch(path)
        .then(response => {
            res.data = response;
            next();
        });
};

module.exports = weather;
