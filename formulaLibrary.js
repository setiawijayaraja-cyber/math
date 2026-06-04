window.WingsMath = window.WingsMath || {};
var WingsMath = window.WingsMath;
WingsMath.formulaLibrary = WingsMath.formulaLibrary || {};
WingsMath.formulaLibrary.currentResults = [];

WingsMath.formulaLibrary.getCategories = function() {
  const categories = new Set();
  formulas.forEach(item => {
    if (item.topic) categories.add(item.topic);
  });
  return Array.from(categories).sort();
};

WingsMath.formulaLibrary.initialize = function() {
  const searchInput = document.getElementById('formulaSearch');
  const categorySelect = document.getElementById('formulaCategory');
  const clearButton = document.getElementById('formulaClear');

  if (!searchInput || !categorySelect || !clearButton) return;

  const categories = WingsMath.formulaLibrary.getCategories();
  categorySelect.innerHTML = '<option value="">Semua topik</option>' + categories.map(topic => `<option value="${topic}">${topic}</option>`).join('');

  searchInput.addEventListener('input', WingsMath.formulaLibrary.applyFilter);
  categorySelect.addEventListener('change', WingsMath.formulaLibrary.applyFilter);
  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    categorySelect.value = '';
    WingsMath.formulaLibrary.applyFilter();
  });

  WingsMath.formulaLibrary.applyFilter();
};

WingsMath.formulaLibrary.applyFilter = function() {
  const query = document.getElementById('formulaSearch')?.value.trim().toLowerCase() || '';
  const category = document.getElementById('formulaCategory')?.value || '';
  WingsMath.formulaLibrary.currentResults = formulas.filter(item => {
    const matchesQuery = query === '' || [item.name, item.topic, item.formula, item.explanation, item.example].some(value => value.toLowerCase().includes(query));
    const matchesCategory = !category || item.topic === category;
    return matchesQuery && matchesCategory;
  });
  WingsMath.formulaLibrary.renderList(WingsMath.formulaLibrary.currentResults);
  WingsMath.formulaLibrary.renderFavoriteList();
};

WingsMath.formulaLibrary.renderList = function(list) {
  const results = document.getElementById('formulaResults');
  if (!results) return;
  results.innerHTML = '';

  list.slice(0, 24).forEach(item => {
    const card = document.createElement('div');
    card.className = 'formula-item';
    const favorite = WingsMath.appState.favorites.includes(item.id);
    card.innerHTML = `
      <h4>${item.name}</h4>
      <strong>${item.topic || 'General'}</strong>
      <p><code>${item.formula}</code></p>
      <p>${item.explanation}</p>
      <p><em>${item.example}</em></p>
      <div class="search-row">
        <button class="btn small" data-action="detail" data-id="${item.id}">Detail</button>
        <button class="btn small" data-action="favorite" data-id="${item.id}">${favorite ? 'Batal' : 'Simpan'}</button>
      </div>
    `;
    results.appendChild(card);
  });

  results.querySelectorAll('button[data-action="detail"]').forEach(button => {
    button.addEventListener('click', () => {
      const item = formulas.find(formula => formula.id === Number(button.dataset.id));
      if (item) WingsMath.formulaLibrary.showDetail(item);
    });
  });

  results.querySelectorAll('button[data-action="favorite"]').forEach(button => {
    button.addEventListener('click', () => {
      WingsMath.formulaLibrary.toggleFavorite(Number(button.dataset.id));
    });
  });
};

WingsMath.formulaLibrary.showDetail = function(item) {
  const detail = document.getElementById('formulaDetail');
  if (!detail) return;
  detail.innerHTML = `
    <h4>${item.name}</h4>
    <p><strong>Topik:</strong> ${item.topic}</p>
    <p><strong>Formula:</strong> <code>${item.formula}</code></p>
    <p>${item.explanation}</p>
    <p><em>${item.example}</em></p>
  `;
};

WingsMath.formulaLibrary.toggleFavorite = function(id) {
  if (WingsMath.appState.favorites.includes(id)) {
    WingsMath.appState.favorites = WingsMath.appState.favorites.filter(itemId => itemId !== id);
  } else {
    WingsMath.appState.favorites.push(id);
  }
  WingsMath.saveState();
  WingsMath.formulaLibrary.applyFilter();
  if (WingsMath.notes && WingsMath.notes.renderFavorites) {
    WingsMath.notes.renderFavorites();
  }
};

WingsMath.formulaLibrary.renderFavoriteList = function() {
  if (!WingsMath.notes || !WingsMath.notes.favoriteContainer) return;
  const favoriteContainer = WingsMath.notes.favoriteContainer;
  favoriteContainer.innerHTML = '';
  const favorites = WingsMath.appState.favorites.map(id => formulas.find(item => item.id === id)).filter(Boolean).slice(0, 6);
  if (favorites.length === 0) {
    favoriteContainer.innerHTML = '<p class="muted">Tiada formula disimpan. Gunakan butang Simpan dalam pustaka formula.</p>';
    return;
  }
  favorites.forEach(item => {
    const card = document.createElement('div');
    card.className = 'favorite-card';
    card.innerHTML = `<h4>${item.name}</h4><p>${item.topic}</p><p><code>${item.formula}</code></p>`;
    favoriteContainer.appendChild(card);
  });
};
