"use strict";

const axios = require("axios");
const argv = require('minimist')(process.argv.slice(2));

(async () => {
  
  axios.interceptors.request.use(function (config) {
    config.metadata = { startTime: new Date()}
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    response.config.metadata.endTime = new Date()
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.all([argv.url, argv.url, argv.url])
  .then(axios.spread((...responses) => {
    const responseOne = responses[0]
    const responseTwo = responses[1]
    const responesThree = responses[2]
    var max = Math.max(responseOne.duration, responseTwo.duration, responseThree.duration);
    process.stdout.write(max.toString());
    process.exitCode = 0;
  }))
  .catch(errors => {
    process.exitCode = 1;
  })

  /*axios.get(argv.url)
  .then((response) => {
    process.stdout.write(response.duration.toString());
    process.exitCode = 0;
  })
  .catch((error) => {
    process.exitCode = 1;
  })*/
})();
