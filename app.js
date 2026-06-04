document.addEventListener('DOMContentLoaded', function() {
  try {
    WingsMath.loadState();
    if (WingsMath.settings) {
      WingsMath.settings.applyTheme();
      WingsMath.settings.applyLanguage();
      WingsMath.settings.initialize();
    } else {
      console.warn('WingsMath.settings is not defined');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    if (WingsMath.dashboard) WingsMath.dashboard.update();
    if (WingsMath.formulaLibrary) WingsMath.formulaLibrary.initialize();
    if (WingsMath.quickAnswer) WingsMath.quickAnswer.initialize();
    if (WingsMath.graphEngine) WingsMath.graphEngine.initialize();
    if (WingsMath.diagram) WingsMath.diagram.initialize();
    if (WingsMath.quizExam) WingsMath.quizExam.initialize();
    if (WingsMath.notes) WingsMath.notes.initialize();
    if (WingsMath.search) WingsMath.search.initialize();
    if (WingsMath.formulaLibrary && WingsMath.formulaLibrary.renderFavoriteList) {
      WingsMath.formulaLibrary.renderFavoriteList();
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
});
