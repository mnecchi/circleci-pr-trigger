const triggerPipeline = require('./triggerPipeline');

const circleCIAPIUrl = process.env.CIRCLE_CI_API_URL;
const circleCIAPIToken = process.env.CIRCLECI_API_TOKEN;

module.exports = app => {
  app.on('pull_request.synchronize', triggerPipeline(app)(circleCIAPIUrl, circleCIAPIToken));
  app.on('pull_request.opened', triggerPipeline(app)(circleCIAPIUrl, circleCIAPIToken));
};
