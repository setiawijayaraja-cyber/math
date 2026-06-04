window.WingsMath = window.WingsMath || {};
var WingsMath = window.WingsMath;
WingsMath.diagram = WingsMath.diagram || {};

WingsMath.diagram.diagrams = [
  {
    id: 'triangle',
    title: 'Segi tiga',
    render: function() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 320 220');
      svg.innerHTML = `
        <polygon points="50,180 270,180 160,40" fill="rgba(59,130,246,0.14)" stroke="#2563eb" stroke-width="4" />
        <line x1="160" y1="40" x2="160" y2="180" stroke="#0f172a" stroke-dasharray="6 4" />
        <text x="165" y="30" fill="#0f172a">h</text>
        <text x="180" y="105" fill="#0f172a">a</text>
        <text x="160" y="200" fill="#0f172a">b</text>
      `;
      return svg;
    }
  },
  {
    id: 'circle',
    title: 'Bulatan',
    render: function() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 320 220');
      svg.innerHTML = `
        <circle cx="160" cy="110" r="70" fill="rgba(34,197,94,0.15)" stroke="#16a34a" stroke-width="4" />
        <line x1="160" y1="110" x2="230" y2="110" stroke="#0f172a" stroke-width="3" />
        <text x="236" y="114" fill="#0f172a">r</text>
      `;
      return svg;
    }
  },
  {
    id: 'pythagoras',
    title: 'Pythagoras',
    render: function() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 320 220');
      svg.innerHTML = `
        <polygon points="50,180 270,180 270,80" fill="rgba(59,130,246,0.14)" stroke="#2563eb" stroke-width="4" />
        <text x="90" y="150" fill="#0f172a">a</text>
        <text x="220" y="130" fill="#0f172a">b</text>
        <text x="145" y="60" fill="#0f172a">c</text>
      `;
      return svg;
    }
  },
  {
    id: 'linear',
    title: 'Graf Linear',
    render: function() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 320 220');
      svg.innerHTML = `
        <line x1="40" y1="180" x2="280" y2="40" stroke="#2563eb" stroke-width="4" />
        <line x1="40" y1="180" x2="300" y2="180" stroke="#0f172a" />
        <line x1="40" y1="180" x2="40" y2="20" stroke="#0f172a" />
        <text x="292" y="45" fill="#0f172a">y</text>
        <text x="305" y="188" fill="#0f172a">x</text>
      `;
      return svg;
    }
  },
  {
    id: 'quadratic',
    title: 'Graf Kuadratik',
    render: function() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 320 220');
      svg.innerHTML = `
        <path d="M40,180 Q160,20 280,180" fill="none" stroke="#16a34a" stroke-width="4" />
        <line x1="40" y1="180" x2="300" y2="180" stroke="#0f172a" />
        <line x1="40" y1="180" x2="40" y2="20" stroke="#0f172a" />
        <text x="292" y="190" fill="#0f172a">x</text>
        <text x="20" y="18" fill="#0f172a">y</text>
      `;
      return svg;
    }
  }
];

WingsMath.diagram.initialize = function() {
  const select = document.getElementById('diagramSelect');
  const refresh = document.getElementById('diagramRefresh');
  if (!select) return;
  select.innerHTML = WingsMath.diagram.diagrams.map(item => `<option value="${item.id}">${item.title}</option>`).join('');
  select.addEventListener('change', WingsMath.diagram.renderSelected);
  if (refresh) refresh.addEventListener('click', WingsMath.diagram.renderSelected);
  WingsMath.diagram.renderSelected();
};

WingsMath.diagram.renderSelected = function() {
  const select = document.getElementById('diagramSelect');
  const view = document.getElementById('diagramView');
  if (!select || !view) return;
  const diagram = WingsMath.diagram.diagrams.find(item => item.id === select.value) || WingsMath.diagram.diagrams[0];
  view.innerHTML = '';
  view.appendChild(diagram.render());
};
