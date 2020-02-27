const axios = require('axios');

module.exports = app => (circleCIAPIUrl, circleCIAPIToken) => async ({ payload }) => {
  const { pull_request } = payload;

  if (pull_request) {
    const { user, head } = pull_request;  
    const { login } = user;
    const { ref: branch, repo } = head;
    const { full_name: repoFullName } = repo;
    const url = `${circleCIAPIUrl}/${repoFullName}/pipeline`;
    const data = { branch };

    app.log(`
URL: ${url}
Data: ${JSON.stringify(data)}
`);

    const response = await axios({
      url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Circle-Token': circleCIAPIToken,
        'x-attribution-login': login
      },
      data
    });

    app.log(`
Reponse: ${JSON.stringify(response.data)}
`);
  }
};
