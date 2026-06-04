window.WingsMath = window.WingsMath || {};
var WingsMath = window.WingsMath;
WingsMath.search = WingsMath.search || {};

WingsMath.search.initialize = function() {
  const searchInput = document.getElementById('globalSearch');
  const searchButton = document.getElementById('globalSearchBtn');
  const jsonButton = document.getElementById('exportJson');
  const csvButton = document.getElementById('exportCsv');

  if (!searchInput || !searchButton) return;

  searchButton.addEventListener('click', WingsMath.search.runSearch);
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') WingsMath.search.runSearch();
  });

  if (jsonButton) jsonButton.addEventListener('click', WingsMath.search.exportJson);
  if (csvButton) csvButton.addEventListener('click', WingsMath.search.exportCsv);
};

WingsMath.search.runSearch = function() {
  const query = document.getElementById('globalSearch')?.value.trim().toLowerCase();
  const resultsContainer = document.getElementById('globalSearchResults');
  if (!resultsContainer) return;

  if (!query) {
    resultsContainer.innerHTML = '<p class="muted">Masukkan kata kunci untuk mencari formula atau soalan.</p>';
    return;
  }

  const formulaMatches = formulas.filter(item => [item.name, item.topic, item.formula, item.explanation, item.example].some(value => value.toLowerCase().includes(query))).slice(0, 10);
  const questionMatches = questions.filter(item => [item.question, item.topic, item.level].some(value => value.toLowerCase().includes(query))).slice(0, 10);

  resultsContainer.innerHTML = '';

  if (formulaMatches.length) {
    const section = document.createElement('div');
    section.innerHTML = '<h4>Formula yang dijumpai</h4>';
    formulaMatches.forEach(item => {
      const card = document.createElement('div');
      card.className = 'formula-item';
      card.innerHTML = `<h4>${item.name}</h4><p>${item.topic}</p><p><code>${item.formula}</code></p>`;
      section.appendChild(card);
    });
    resultsContainer.appendChild(section);
  }

  if (questionMatches.length) {
    const section = document.createElement('div');
    section.innerHTML = '<h4>Soalan yang dijumpai</h4>';
    questionMatches.forEach(item => {
      const card = document.createElement('div');
      card.className = 'formula-item';
      card.innerHTML = `<p>${item.question}</p><p class="muted">Jawapan: ${item.answer} · ${item.topic}, ${item.level}</p>`;
      section.appendChild(card);
    });
    resultsContainer.appendChild(section);
  }

  if (!formulaMatches.length && !questionMatches.length) {
    resultsContainer.innerHTML = '<p class="muted">Tiada hasil dijumpai. Cuba kata kunci lain.</p>';
  }
};

WingsMath.search.exportJson = function() {
  const payload = {
    formulas,
    questions,
    favorites: WingsMath.appState.favorites,
    notes: WingsMath.appState.notes
  };
  WingsMath.search.downloadFile(JSON.stringify(payload, null, 2), 'wings-math-export.json');
};

WingsMath.search.exportCsv = function() {
  const rows = ['Jenis,Topik,Soalan/Formula,Jawapan/Formula'];
  questions.slice(0, 20).forEach(item => {
    rows.push(`Soalan,${item.topic},"${item.question}","${item.answer}"`);
  });
  formulas.slice(0, 20).forEach(item => {
    rows.push(`Formula,${item.topic},"${item.name}","${item.formula}"`);
  });
  WingsMath.search.downloadFile(rows.join('\n'), 'wings-math-export.csv');
};

WingsMath.search.downloadFile = function(content, fileName) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
};
