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

module.exports = {
  getReposStats,
};
