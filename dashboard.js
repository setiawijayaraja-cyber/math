window.WingsMath = window.WingsMath || {};
var WingsMath = window.WingsMath;
WingsMath.dashboard = WingsMath.dashboard || {};

WingsMath.dashboard.getAverage = function() {
  const { total, correct } = WingsMath.appState.progress;
  return total > 0 ? Math.round((correct / total) * 100) : 0;
};

WingsMath.dashboard.update = function() {
  const { total, studyMinutes, todayPractice, strongTopics, weakTopics } = WingsMath.appState.progress;
  const avg = WingsMath.dashboard.getAverage();
  const dashboardMap = {
    statPractice: total,
    statAverage: `${avg}%`,
    statStrong: strongTopics[0] || '- ',
    statWeak: weakTopics[0] || '- ',
    studyTime: `${studyMinutes} min`,
    todayPractice: todayPractice
  };

  Object.entries(dashboardMap).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });

  WingsMath.dashboard.renderBadges();
};

WingsMath.dashboard.awardAchievements = function() {
  const badges = [
    { id: 'Pemula', rule: () => WingsMath.appState.progress.sessions >= 1 },
    { id: 'Pelajar Aktif', rule: () => WingsMath.appState.progress.sessions >= 10 },
    { id: 'Formula Mahir', rule: () => WingsMath.appState.favorites.length >= 20 },
    { id: 'Algebra Master', rule: () => WingsMath.appState.progress.strongTopics.includes('Algebra') },
    { id: 'Trigonometri Master', rule: () => WingsMath.appState.progress.strongTopics.includes('Trigonometri') },
    { id: 'SPM Champion', rule: () => WingsMath.appState.progress.correct >= 500 }
  ];

  badges.forEach(badge => {
    if (badge.rule() && !WingsMath.appState.achievements.includes(badge.id)) {
      WingsMath.appState.achievements.push(badge.id);
    }
  });
};

WingsMath.dashboard.renderBadges = function() {
  const badgeList = document.getElementById('badgeList');
  if (!badgeList) return;
  badgeList.innerHTML = '';
  const badgeNames = ['Pemula', 'Pelajar Aktif', 'Formula Mahir', 'Algebra Master', 'Trigonometri Master', 'SPM Champion'];

  badgeNames.forEach(name => {
    const badge = document.createElement('div');
    badge.className = 'badge';
    const unlocked = WingsMath.appState.achievements.includes(name);
    badge.textContent = `${unlocked ? '🏅' : '⚪'} ${name}`;
    badgeList.appendChild(badge);
  });
};

WingsMath.dashboard.recordSession = function({ correct, wrong, topicCounts }) {
  const now = new Date().toISOString();
  WingsMath.appState.progress.sessions += 1;
  WingsMath.appState.progress.total += correct + wrong;
  WingsMath.appState.progress.correct += correct;
  WingsMath.appState.progress.todayPractice += correct + wrong;
  WingsMath.appState.progress.weekly.push({ date: now, score: correct });
  WingsMath.appState.progress.monthly.push({ date: now, score: correct });

  const topics = Object.entries(topicCounts || {}).sort((a, b) => b[1] - a[1]).map(entry => entry[0]);
  WingsMath.appState.progress.strongTopics = topics.slice(0, 2);
  WingsMath.appState.progress.weakTopics = topics.slice(-2).filter(Boolean);
  WingsMath.dashboard.awardAchievements();
  WingsMath.saveState();
  WingsMath.dashboard.update();
};
