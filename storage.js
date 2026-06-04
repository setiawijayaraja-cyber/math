window.WingsMath = window.WingsMath || {};
var WingsMath = window.WingsMath;

WingsMath.STORAGE_KEYS = {
  settings: 'wingsMathSettings',
  progress: 'wingsMathProgress',
  achievements: 'wingsMathAchievements',
  notes: 'wingsMathNotes',
  favorites: 'wingsMathFavorites'
};

WingsMath.defaultState = {
  theme: 'light',
  lang: 'ms',
  favorites: [],
  notes: '',
  achievements: [],
  progress: {
    total: 0,
    correct: 0,
    sessions: 0,
    weekly: [],
    monthly: [],
    strongTopics: [],
    weakTopics: [],
    studyMinutes: 0,
    todayPractice: 0
  }
};

WingsMath.appState = JSON.parse(JSON.stringify(WingsMath.defaultState));

WingsMath.loadState = function() {
  try {
    const savedSettings = localStorage.getItem(WingsMath.STORAGE_KEYS.settings);
    const savedProgress = localStorage.getItem(WingsMath.STORAGE_KEYS.progress);
    const savedAchievements = localStorage.getItem(WingsMath.STORAGE_KEYS.achievements);
    const savedNotes = localStorage.getItem(WingsMath.STORAGE_KEYS.notes);
    const savedFavorites = localStorage.getItem(WingsMath.STORAGE_KEYS.favorites);

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      WingsMath.appState.theme = settings.theme || WingsMath.appState.theme;
      WingsMath.appState.lang = settings.lang || WingsMath.appState.lang;
    }

    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      WingsMath.appState.progress = { ...WingsMath.appState.progress, ...progress };
    }

    if (savedAchievements) {
      WingsMath.appState.achievements = JSON.parse(savedAchievements);
    }

    if (savedNotes) {
      WingsMath.appState.notes = savedNotes;
    }

    if (savedFavorites) {
      WingsMath.appState.favorites = JSON.parse(savedFavorites);
    }
  } catch (error) {
    console.warn('Unable to load saved state', error);
  }

  WingsMath.appState.progress.weekly = Array.isArray(WingsMath.appState.progress.weekly) ? WingsMath.appState.progress.weekly : [];
  WingsMath.appState.progress.monthly = Array.isArray(WingsMath.appState.progress.monthly) ? WingsMath.appState.progress.monthly : [];
  WingsMath.appState.progress.strongTopics = Array.isArray(WingsMath.appState.progress.strongTopics) ? WingsMath.appState.progress.strongTopics : [];
  WingsMath.appState.progress.weakTopics = Array.isArray(WingsMath.appState.progress.weakTopics) ? WingsMath.appState.progress.weakTopics : [];
};

WingsMath.saveState = function() {
  localStorage.setItem(WingsMath.STORAGE_KEYS.settings, JSON.stringify({ theme: WingsMath.appState.theme, lang: WingsMath.appState.lang }));
  localStorage.setItem(WingsMath.STORAGE_KEYS.progress, JSON.stringify(WingsMath.appState.progress));
  localStorage.setItem(WingsMath.STORAGE_KEYS.achievements, JSON.stringify(WingsMath.appState.achievements));
  localStorage.setItem(WingsMath.STORAGE_KEYS.notes, WingsMath.appState.notes || '');
  localStorage.setItem(WingsMath.STORAGE_KEYS.favorites, JSON.stringify(WingsMath.appState.favorites));
};
