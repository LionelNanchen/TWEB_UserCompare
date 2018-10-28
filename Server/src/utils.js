function getReposLanguagesStats(reposLanguages = []) {
  const stats = {};
  const countLanguages = o => {
    Object.keys(o).forEach(key => {
      const value = o[key];
      const current = stats[key] || 0;
      stats[key] = current + value;
    });
  };
  reposLanguages.forEach(countLanguages);
  return stats;
}

function getReposStats(reposStats = [], username) {
  const filtered = [];

  // filter by username
  reposStats.forEach((s) => {
    if (s.constructor === Array) {
      s.forEach((e) => {
        if (e.author.login === username) { filtered.push(e); }
      });
    }
  });

  const stats = {
    a: 0,
    d: 0,
    c: 0,
  };

  filtered.forEach((e) => {
    stats.c += e.total;
    e.weeks.forEach((f) => {
      stats.a += f.a;
      stats.d += f.d;
    });
  });

  return stats;
}

function getFollowStats(){}

module.exports = {
  getReposLanguagesStats,
  getReposStats,
};
