window.WingsMath = window.WingsMath || {};
var WingsMath = window.WingsMath;
WingsMath.graphEngine = WingsMath.graphEngine || {};

WingsMath.graphEngine.matrix = {
  linear: { fields: [{ name: 'm', label: 'Kecerunan (m)', value: 1 }, { name: 'c', label: 'Imbasan (c)', value: 0 }] },
  quadratic: { fields: [{ name: 'a', label: 'a', value: 1 }, { name: 'b', label: 'b', value: 0 }, { name: 'c', label: 'c', value: 0 }] },
  sin: { fields: [{ name: 'A', label: 'Amplitud', value: 1 }, { name: 'B', label: 'Kekerapan', value: 1 }, { name: 'C', label: 'Fasa', value: 0 }] },
  cos: { fields: [{ name: 'A', label: 'Amplitud', value: 1 }, { name: 'B', label: 'Kekerapan', value: 1 }, { name: 'C', label: 'Fasa', value: 0 }] },
  tan: { fields: [{ name: 'A', label: 'Skala', value: 1 }, { name: 'B', label: 'Kekerapan', value: 1 }] }
};

WingsMath.graphEngine.initialize = function() {
  const graphTypeSelect = document.getElementById('graphType');
  const drawButton = document.getElementById('drawGraphBtn');

  if (!graphTypeSelect || !drawButton) return;
  graphTypeSelect.addEventListener('change', () => WingsMath.graphEngine.renderControls(graphTypeSelect.value));
  drawButton.addEventListener('click', WingsMath.graphEngine.drawGraph);
  WingsMath.graphEngine.renderControls(graphTypeSelect.value);
};

WingsMath.graphEngine.renderControls = function(type) {
  const container = document.getElementById('graphInputs');
  if (!container) return;
  const config = WingsMath.graphEngine.matrix[type] || WingsMath.graphEngine.matrix.linear;
  container.innerHTML = config.fields.map(field => `
      <label>
        <span>${field.label}</span>
        <input type="number" step="0.1" data-field="${field.name}" value="${field.value}" />
      </label>
    `).join('');
};

WingsMath.graphEngine.getParameters = function() {
  const inputs = document.querySelectorAll('#graphInputs input[data-field]');
  const params = {};
  inputs.forEach(input => {
    params[input.dataset.field] = Number(input.value) || 0;
  });
  return params;
};

WingsMath.graphEngine.drawGraph = function() {
  const canvas = document.getElementById('graphCanvas');
  const analysis = document.getElementById('graphAnalysis');
  const type = document.getElementById('graphType')?.value || 'linear';
  if (!canvas || !analysis) return;

  const context = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const params = WingsMath.graphEngine.getParameters();
  context.clearRect(0, 0, width, height);

  context.fillStyle = 'var(--surface-strong)';
  context.fillRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  context.strokeStyle = '#64748b';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(0, centerY);
  context.lineTo(width, centerY);
  context.moveTo(centerX, 0);
  context.lineTo(centerX, height);
  context.stroke();

  const scaleX = width / 24;
  const scaleY = height / 3.5;
  context.strokeStyle = '#2563eb';
  context.lineWidth = 2;
  context.beginPath();

  const plot = x => {
    switch (type) {
      case 'quadratic':
        return params.a * x * x + params.b * x + params.c;
      case 'sin':
        return params.A * Math.sin(params.B * x + params.C);
      case 'cos':
        return params.A * Math.cos(params.B * x + params.C);
      case 'tan':
        return params.A * Math.tan(params.B * x);
      default:
        return params.m * x + params.c;
    }
  };

  for (let px = -12; px <= 12; px += 0.25) {
    const x = px;
    let y = plot(x);
    if (!Number.isFinite(y)) continue;
    const canvasX = centerX + x * scaleX;
    const canvasY = centerY - y * scaleY;
    if (px === -12) context.moveTo(canvasX, canvasY);
    else context.lineTo(canvasX, canvasY);
  }

  context.stroke();

  analysis.innerHTML = `
    <p><strong>Jenis graf:</strong> ${type}</p>
    <p><strong>Parameter:</strong> ${Object.entries(params).map(([key, value]) => `${key}=${value}`).join(', ')}</p>
  `;
};
