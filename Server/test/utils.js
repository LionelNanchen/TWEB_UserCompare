const { expect } = require('chai');
const utils = require('../src/utils');

describe('Github utils', () => {
  it('should calculate languages stats', () => {
    const languages = [
      { CSS: 1, Javascript: 2, MakeFile: 4 },
      {},
      { CSS: 2 },
      { Javascript: 1 },
    ];

    const expected = {
      CSS: 3,
      Javascript: 3,
      MakeFile: 4,
    };

    expect(utils.getReposLanguagesStats(languages)).to.eql(expected);
  });

  it('should calculate repo stats easy with noise', () => {
    const stats = [
      [
        {
          total: 2,
          weeks: [
            {
              w: 1518912000, a: 38, d: 4, c: 20,
            },
            {
              w: 1519516800, a: 0, d: 0, c: 0,
            },
            {
              w: 1520121600, a: 0, d: 0, c: 0,
            },
            {
              w: 1520726400, a: 0, d: 0, c: 0,
            },
            {
              w: 1521331200, a: 0, d: 0, c: 0,
            },
            {
              w: 1521936000, a: 0, d: 0, c: 0,
            },
            {
              w: 1522540800, a: 0, d: 0, c: 0,
            },
            {
              w: 1523145600, a: 0, d: 0, c: 0,
            },
            {
              w: 1523750400, a: 0, d: 0, c: 0,
            },
            {
              w: 1524355200, a: 0, d: 0, c: 0,
            },
            {
              w: 1524960000, a: 0, d: 0, c: 0,
            },
            {
              w: 1525564800, a: 0, d: 0, c: 0,
            },
            {
              w: 1526169600, a: 0, d: 0, c: 0,
            },
            {
              w: 1526774400, a: 0, d: 0, c: 0,
            },
            {
              w: 1527379200, a: 0, d: 0, c: 0,
            },
            {
              w: 1527984000, a: 0, d: 0, c: 0,
            },
            {
              w: 1528588800, a: 0, d: 0, c: 0,
            },
            {
              w: 1529193600, a: 0, d: 0, c: 0,
            },
            {
              w: 1529798400, a: 0, d: 0, c: 0,
            },
            {
              w: 1530403200, a: 0, d: 0, c: 0,
            },
            {
              w: 1531008000, a: 0, d: 0, c: 0,
            },
            {
              w: 1531612800, a: 0, d: 0, c: 0,
            },
            {
              w: 1532217600, a: 0, d: 0, c: 0,
            },
            {
              w: 1532822400, a: 0, d: 0, c: 0,
            },
            {
              w: 1533427200, a: 0, d: 0, c: 0,
            },
            {
              w: 1534032000, a: 52, d: 0, c: 0,
            },
            {
              w: 1534636800, a: 0, d: 2, c: 0,
            },
            {
              w: 1535241600, a: 0, d: 0, c: 0,
            },
            {
              w: 1535846400, a: 0, d: 0, c: 0,
            },
            {
              w: 1536451200, a: 0, d: 0, c: 0,
            },
            {
              w: 1537056000, a: 0, d: 0, c: 0,
            },
            {
              w: 1537660800, a: 0, d: 0, c: 0,
            },
            {
              w: 1538265600, a: 0, d: 0, c: 0,
            },
            {
              w: 1538870400, a: 0, d: 0, c: 0,
            },
            {
              w: 1539475200, a: 0, d: 0, c: 0,
            },
            {
              w: 1540080000, a: 0, d: 2, c: 2,
            },
          ],
          author: {
            login: 'LionelNanchen',
            id: 22542914,
            node_id: 'MDQ6VXNlcjIyNTQyOTE0',
            avatar_url: 'https://avatars1.githubusercontent.com/u/22542914?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/LionelNanchen',
            html_url: 'https://github.com/LionelNanchen',
            followers_url: 'https://api.github.com/users/LionelNanchen/followers',
            following_url: 'https://api.github.com/users/LionelNanchen/following{/other_user}',
            gists_url: 'https://api.github.com/users/LionelNanchen/gists{/gist_id}',
            starred_url: 'https://api.github.com/users/LionelNanchen/starred{/owner}{/repo}',
            subscriptions_url: 'https://api.github.com/users/LionelNanchen/subscriptions',
            organizations_url: 'https://api.github.com/users/LionelNanchen/orgs',
            repos_url: 'https://api.github.com/users/LionelNanchen/repos',
            events_url: 'https://api.github.com/users/LionelNanchen/events{/privacy}',
            received_events_url: 'https://api.github.com/users/LionelNanchen/received_events',
            type: 'User',
            site_admin: false,
          },
        },
      ],
    ];

    const expected = { a: 90, d: 8, c: 2 };

    expect(utils.getReposStats(stats, 'LionelNanchen')).to.eql(expected);
  });

  it('should calculate repo stats with user to be ignored', () => {
    const stats = [
      [
        {
          total: 2,
          weeks: [
            {
              w: 1518912000, a: 38, d: 4, c: 2,
            },
            {
              w: 1519516800, a: 0, d: 0, c: 0,
            },
            {
              w: 1520121600, a: 0, d: 0, c: 0,
            },
            {
              w: 1520726400, a: 0, d: 0, c: 0,
            },
            {
              w: 1521331200, a: 0, d: 0, c: 0,
            },
            {
              w: 1521936000, a: 0, d: 0, c: 0,
            },
            {
              w: 1522540800, a: 0, d: 0, c: 0,
            },
            {
              w: 1523145600, a: 0, d: 0, c: 0,
            },
            {
              w: 1523750400, a: 0, d: 0, c: 0,
            },
            {
              w: 1524355200, a: 0, d: 0, c: 0,
            },
            {
              w: 1524960000, a: 0, d: 0, c: 0,
            },
            {
              w: 1525564800, a: 0, d: 0, c: 0,
            },
            {
              w: 1526169600, a: 0, d: 0, c: 0,
            },
            {
              w: 1526774400, a: 0, d: 0, c: 0,
            },
            {
              w: 1527379200, a: 0, d: 0, c: 0,
            },
            {
              w: 1527984000, a: 0, d: 0, c: 0,
            },
            {
              w: 1528588800, a: 0, d: 0, c: 0,
            },
            {
              w: 1529193600, a: 0, d: 0, c: 0,
            },
            {
              w: 1529798400, a: 0, d: 0, c: 0,
            },
            {
              w: 1530403200, a: 0, d: 0, c: 0,
            },
            {
              w: 1531008000, a: 0, d: 0, c: 0,
            },
            {
              w: 1531612800, a: 0, d: 0, c: 0,
            },
            {
              w: 1532217600, a: 0, d: 0, c: 0,
            },
            {
              w: 1532822400, a: 0, d: 0, c: 0,
            },
            {
              w: 1533427200, a: 0, d: 0, c: 0,
            },
            {
              w: 1534032000, a: 0, d: 0, c: 0,
            },
            {
              w: 1534636800, a: 0, d: 0, c: 0,
            },
            {
              w: 1535241600, a: 0, d: 0, c: 0,
            },
            {
              w: 1535846400, a: 0, d: 0, c: 0,
            },
            {
              w: 1536451200, a: 0, d: 0, c: 0,
            },
            {
              w: 1537056000, a: 0, d: 0, c: 0,
            },
            {
              w: 1537660800, a: 0, d: 0, c: 0,
            },
            {
              w: 1538265600, a: 0, d: 0, c: 0,
            },
            {
              w: 1538870400, a: 0, d: 0, c: 0,
            },
            {
              w: 1539475200, a: 0, d: 0, c: 0,
            },
            {
              w: 1540080000, a: 0, d: 0, c: 0,
            },
          ],
          author: {
            login: 'LionelNanchen',
            id: 22542914,
            node_id: 'MDQ6VXNlcjIyNTQyOTE0',
            avatar_url: 'https://avatars1.githubusercontent.com/u/22542914?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/LionelNanchen',
            html_url: 'https://github.com/LionelNanchen',
            followers_url: 'https://api.github.com/users/LionelNanchen/followers',
            following_url: 'https://api.github.com/users/LionelNanchen/following{/other_user}',
            gists_url: 'https://api.github.com/users/LionelNanchen/gists{/gist_id}',
            starred_url: 'https://api.github.com/users/LionelNanchen/starred{/owner}{/repo}',
            subscriptions_url: 'https://api.github.com/users/LionelNanchen/subscriptions',
            organizations_url: 'https://api.github.com/users/LionelNanchen/orgs',
            repos_url: 'https://api.github.com/users/LionelNanchen/repos',
            events_url: 'https://api.github.com/users/LionelNanchen/events{/privacy}',
            received_events_url: 'https://api.github.com/users/LionelNanchen/received_events',
            type: 'User',
            site_admin: false,
          },
        },
      ],
      [
        {
          total: 2,
          weeks: [
            {
              w: 1518912000, a: 400, d: 2, c: 20,
            },
            {
              w: 1519516800, a: 0, d: 0, c: 0,
            },
            {
              w: 1520121600, a: 0, d: 0, c: 0,
            },
            {
              w: 1520726400, a: 0, d: 0, c: 0,
            },
            {
              w: 1521331200, a: 0, d: 0, c: 0,
            },
            {
              w: 1521936000, a: 0, d: 0, c: 0,
            },
            {
              w: 1522540800, a: 0, d: 0, c: 0,
            },
            {
              w: 1523145600, a: 0, d: 0, c: 0,
            },
            {
              w: 1523750400, a: 0, d: 0, c: 0,
            },
            {
              w: 1524355200, a: 0, d: 0, c: 0,
            },
            {
              w: 1524960000, a: 0, d: 0, c: 0,
            },
            {
              w: 1525564800, a: 0, d: 0, c: 0,
            },
            {
              w: 1526169600, a: 0, d: 0, c: 0,
            },
            {
              w: 1526774400, a: 0, d: 0, c: 0,
            },
            {
              w: 1527379200, a: 0, d: 0, c: 0,
            },
            {
              w: 1527984000, a: 0, d: 0, c: 0,
            },
            {
              w: 1528588800, a: 0, d: 0, c: 0,
            },
            {
              w: 1529193600, a: 0, d: 0, c: 0,
            },
            {
              w: 1529798400, a: 0, d: 0, c: 0,
            },
            {
              w: 1530403200, a: 0, d: 0, c: 0,
            },
            {
              w: 1531008000, a: 0, d: 0, c: 0,
            },
            {
              w: 1531612800, a: 0, d: 0, c: 0,
            },
            {
              w: 1532217600, a: 0, d: 0, c: 0,
            },
            {
              w: 1532822400, a: 0, d: 0, c: 0,
            },
            {
              w: 1533427200, a: 0, d: 0, c: 0,
            },
            {
              w: 1534032000, a: 0, d: 0, c: 0,
            },
            {
              w: 1534636800, a: 0, d: 0, c: 0,
            },
            {
              w: 1535241600, a: 0, d: 0, c: 0,
            },
            {
              w: 1535846400, a: 0, d: 0, c: 0,
            },
            {
              w: 1536451200, a: 0, d: 0, c: 0,
            },
            {
              w: 1537056000, a: 0, d: 0, c: 0,
            },
            {
              w: 1537660800, a: 0, d: 0, c: 0,
            },
            {
              w: 1538265600, a: 0, d: 0, c: 0,
            },
            {
              w: 1538870400, a: 0, d: 0, c: 0,
            },
            {
              w: 1539475200, a: 0, d: 0, c: 0,
            },
            {
              w: 1540080000, a: 0, d: 0, c: 0,
            },
          ],
          author: {
            login: 'onicoleheig',
            id: 22542914,
            node_id: 'MDQ6VXNlcjIyNTQyOTE0',
            avatar_url: 'https://avatars1.githubusercontent.com/u/22542914?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/LionelNanchen',
            html_url: 'https://github.com/LionelNanchen',
            followers_url: 'https://api.github.com/users/LionelNanchen/followers',
            following_url: 'https://api.github.com/users/LionelNanchen/following{/other_user}',
            gists_url: 'https://api.github.com/users/LionelNanchen/gists{/gist_id}',
            starred_url: 'https://api.github.com/users/LionelNanchen/starred{/owner}{/repo}',
            subscriptions_url: 'https://api.github.com/users/LionelNanchen/subscriptions',
            organizations_url: 'https://api.github.com/users/LionelNanchen/orgs',
            repos_url: 'https://api.github.com/users/LionelNanchen/repos',
            events_url: 'https://api.github.com/users/LionelNanchen/events{/privacy}',
            received_events_url: 'https://api.github.com/users/LionelNanchen/received_events',
            type: 'User',
            site_admin: false,
          },
        },
      ],
    ];

    const expected = { a: 38, d: 4, c: 2 };

    expect(utils.getReposStats(stats, 'LionelNanchen')).to.eql(expected);
  });

  it('should calculate repo stats using total for commits not c', () => {
    const stats = [
      [
        {
          total: 42,
          weeks: [
            {
              w: 1518912000, a: 38, d: 4, c: 20,
            },
            {
              w: 1519516800, a: 0, d: 0, c: 20,
            },
          ],
          author: {
            login: 'LionelNanchen',
            id: 22542914,
            node_id: 'MDQ6VXNlcjIyNTQyOTE0',
            avatar_url: 'https://avatars1.githubusercontent.com/u/22542914?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/LionelNanchen',
            html_url: 'https://github.com/LionelNanchen',
            followers_url: 'https://api.github.com/users/LionelNanchen/followers',
            following_url: 'https://api.github.com/users/LionelNanchen/following{/other_user}',
            gists_url: 'https://api.github.com/users/LionelNanchen/gists{/gist_id}',
            starred_url: 'https://api.github.com/users/LionelNanchen/starred{/owner}{/repo}',
            subscriptions_url: 'https://api.github.com/users/LionelNanchen/subscriptions',
            organizations_url: 'https://api.github.com/users/LionelNanchen/orgs',
            repos_url: 'https://api.github.com/users/LionelNanchen/repos',
            events_url: 'https://api.github.com/users/LionelNanchen/events{/privacy}',
            received_events_url: 'https://api.github.com/users/LionelNanchen/received_events',
            type: 'User',
            site_admin: false,
          },
        },
      ],
    ];

    const expected = { a: 38, d: 4, c: 42 };

    expect(utils.getReposStats(stats, 'LionelNanchen')).to.eql(expected);
  });
});
