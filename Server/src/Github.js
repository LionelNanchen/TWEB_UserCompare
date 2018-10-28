const fetch = require('node-fetch');

class ResponseError extends Error {
  constructor(res, body) {
    super(`${res.status} error requesting ${res.url}: ${res.statusText}`);
    this.status = res.status;
    this.path = res.url;
    this.body = body;
  }
}

class Github {
  constructor({ token, baseUrl = 'https://api.github.com' } = {}) {
    this.token = token;
    this.baseUrl = baseUrl;
  }

  setToken(token) {
    this.token = token;
  }

  request(path, opts = {}) {
    const url = `${this.baseUrl}${path}`;
    const options = {
      ...opts,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${this.token}`,
      },
    };

    return fetch(url, options)
      .then(res => res.json()
        .then((data) => {
          if (!res.ok) {
            throw new ResponseError(res, data);
          }

          return data;
        }));
  }

  user(username) {
    return this.request(`/users/${username}`);
  }

  userFollowing(username) {
    return this.request(`/users/${username}/following`);
  }

  userFollowers(username) {
    return this.request(`/users/${username}/followers`);
  }

  repos(username) {
    return this.request(`/users/${username}/repos`);
  }

  repoLanguages(repoName) {
    return this.request(`/repos/${repoName}/languages`);
  }

  repoStats(repoName) {
    // doc https://developer.github.com/v3/repos/statistics/
    return this.request(`/repos/${repoName}/stats/contributors`);
  }

  userLanguages(username) {
    return this.repos(username)
      .then((repos) => {
        const getLanguages = repo => this.repoLanguages(repo.full_name);
        return Promise.all(repos.map(getLanguages));
      });
  }

  userStats(username) {
    return this.repos(username)
      .then((repos) => {
        const getStats = repo => this.repoStats(repo.full_name);
        // the filter ignore empty repos (error is the repo is empty with stats API) : https://github.com/octokit/octokit.rb/issues/912
        return Promise.all(repos.filter(repo => repo.size).map(getStats));
      });
  }
}

module.exports = Github;
