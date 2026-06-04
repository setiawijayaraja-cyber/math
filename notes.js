window.WingsMath = window.WingsMath || {};
var WingsMath = window.WingsMath;
WingsMath.notes = WingsMath.notes || {};

WingsMath.notes.initialize = function() {
  const notesElement = document.getElementById('studyNotes');
  const saveButton = document.getElementById('saveNotesBtn');
  const summary = document.getElementById('studyContent');
  const favoriteContainer = document.getElementById('favoriteList');

  WingsMath.notes.noteElement = notesElement;
  WingsMath.notes.summary = summary;
  WingsMath.notes.favoriteContainer = favoriteContainer;

  if (notesElement) {
    notesElement.value = WingsMath.appState.notes || '';
    notesElement.addEventListener('input', WingsMath.notes.saveNotes);
  }

  if (saveButton) {
    saveButton.addEventListener('click', WingsMath.notes.saveNotes);
  }

  WingsMath.notes.renderStudyContent();
  WingsMath.notes.renderFavorites();
};

WingsMath.notes.saveNotes = function() {
  const value = WingsMath.notes.noteElement?.value || '';
  WingsMath.appState.notes = value;
  WingsMath.saveState();
  WingsMath.notes.renderStudyContent();
};

WingsMath.notes.renderStudyContent = function() {
  if (!WingsMath.notes.summary) return;
  const notes = WingsMath.appState.notes.trim();
  WingsMath.notes.summary.innerHTML = notes ? `<p>${notes.replace(/\n/g, '<br>')}</p>` : '<p class="muted">Catatan kosong. Tulis nota ringkas untuk ulang kaji cepat.</p>';
};

WingsMath.notes.renderFavorites = function() {
  if (!WingsMath.notes.favoriteContainer) return;
  WingsMath.notes.favoriteContainer.innerHTML = '';
  const favorites = WingsMath.appState.favorites.map(id => formulas.find(item => item.id === id)).filter(Boolean).slice(0, 5);
  if (favorites.length === 0) {
    WingsMath.notes.favoriteContainer.innerHTML = '<p class="muted">Tiada formula kegemaran. Simpan beberapa formula untuk rujukan pantas.</p>';
    return;
  }

  favorites.forEach(item => {
    const card = document.createElement('div');
    card.className = 'favorite-card';
    card.innerHTML = `<h4>${item.name}</h4><p>${item.topic}</p><p><code>${item.formula}</code></p>`;
    WingsMath.notes.favoriteContainer.appendChild(card);
  });
};
