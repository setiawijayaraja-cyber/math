window.WingsMath = window.WingsMath || {};
var WingsMath = window.WingsMath;
WingsMath.settings = WingsMath.settings || {};

WingsMath.settings.translations = {
  ms: {
    homeHeadline: 'Semua alat matematik dalam satu aplikasi',
    homeDescription: 'Belajar, berlatih dan semak sendiri topik SPM dengan kalkulator, formula, soalan latihan dan carta prestasi.',
    btnDashboard: 'Buka Dashboard',
    btnExamMode: 'Mulakan Mod SPM',
    calculatorTitle: 'Kalkulator Saintifik Pro',
    calculatorSubtitle: 'Sin, cos, tan, log, ln, π, e, faktorial dan lebih lagi.',
    formulaLibraryTitle: 'Ruang Formula',
    formulaLibrarySubtitle: 'Cari formula, kategori dan simpan kegemaran anda.',
    achievementTitle: 'Lencana Pencapaian'
  },
  en: {
    homeHeadline: 'All math tools in one application',
    homeDescription: 'Learn, practice, and review SPM topics with calculator, formulas, quizzes and performance charts.',
    btnDashboard: 'Open Dashboard',
    btnExamMode: 'Start Exam Mode',
    calculatorTitle: 'Scientific Calculator Pro',
    calculatorSubtitle: 'Sin, cos, tan, log, ln, π, e, factorial and more.',
    formulaLibraryTitle: 'Formula Hub',
    formulaLibrarySubtitle: 'Search formulas, categories and save your favorites.',
    achievementTitle: 'Achievement Badges'
  }
};

WingsMath.settings.applyTheme = function() {
  document.documentElement.setAttribute('data-theme', WingsMath.appState.theme);
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.textContent = WingsMath.appState.theme === 'light' ? '🌙' : '☀️';
  }
};

WingsMath.settings.applyLanguage = function() {
  const labels = document.querySelectorAll('[data-key]');
  labels.forEach(element => {
    const key = element.getAttribute('data-key');
    if (key && WingsMath.settings.translations[WingsMath.appState.lang] && WingsMath.settings.translations[WingsMath.appState.lang][key]) {
      element.textContent = WingsMath.settings.translations[WingsMath.appState.lang][key];
    }
  });
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = WingsMath.appState.lang === 'ms' ? 'EN' : 'MS';
  }
};

WingsMath.settings.toggleTheme = function() {
  WingsMath.appState.theme = WingsMath.appState.theme === 'light' ? 'dark' : 'light';
  WingsMath.settings.applyTheme();
  WingsMath.saveState();
};

WingsMath.settings.toggleLanguage = function() {
  WingsMath.appState.lang = WingsMath.appState.lang === 'ms' ? 'en' : 'ms';
  WingsMath.settings.applyLanguage();
  WingsMath.saveState();
};

WingsMath.settings.initialize = function() {
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  if (themeToggle) themeToggle.addEventListener('click', WingsMath.settings.toggleTheme);
  if (langToggle) langToggle.addEventListener('click', WingsMath.settings.toggleLanguage);
};
