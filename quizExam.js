window.WingsMath = window.WingsMath || {};
var WingsMath = window.WingsMath;
WingsMath.quizExam = WingsMath.quizExam || {};

WingsMath.quizExam.session = null;

WingsMath.quizExam.initialize = function() {
  const topicSelect = document.getElementById('examTopic');
  const levelSelect = document.getElementById('examLevel');
  const startButton = document.getElementById('startExamBtn');
  if (!topicSelect || !levelSelect || !startButton) return;

  const topics = [...new Set(questions.map(item => item.topic))].sort();
  topicSelect.innerHTML = `<option value="">Semua topik</option>` + topics.map(topic => `<option value="${topic}">${topic}</option>`).join('');

  const levels = [...new Set(questions.map(item => item.level))].sort();
  levelSelect.innerHTML = `<option value="">Semua tahap</option>` + levels.map(level => `<option value="${level}">${level}</option>`).join('');

  startButton.addEventListener('click', WingsMath.quizExam.startExam);
};

WingsMath.quizExam.startExam = function() {
  const topic = document.getElementById('examTopic')?.value;
  const level = document.getElementById('examLevel')?.value;
  const pool = questions.filter(item => (!topic || item.topic === topic) && (!level || item.level === level));
  if (pool.length === 0) {
    WingsMath.quizExam.updateStatus('Tiada soalan untuk pilihan ini. Sila cuba semula.');
    return;
  }

  WingsMath.quizExam.session = {
    questions: WingsMath.quizExam.shuffle(pool).slice(0, 8),
    current: 0,
    correct: 0,
    wrong: 0,
    topicCounts: {}
  };

  WingsMath.quizExam.renderCurrentQuestion();
};

WingsMath.quizExam.renderCurrentQuestion = function() {
  const card = document.getElementById('examCard');
  const result = document.getElementById('examResult');
  if (!card || !result) return;
  result.innerHTML = '';

  const session = WingsMath.quizExam.session;
  if (!session || session.current >= session.questions.length) {
    return WingsMath.quizExam.finishExam();
  }

  const current = session.questions[session.current];
  card.innerHTML = `
    <div class="quiz-card">
      <h4>Soalan ${session.current + 1} dari ${session.questions.length}</h4>
      <p>${current.question}</p>
      <div class="quiz-options" id="examOptions"></div>
    </div>
  `;

  const optionsContainer = document.getElementById('examOptions');
  if (!optionsContainer) return;
  current.options.slice().sort(() => Math.random() - 0.5).forEach(option => {
    const button = document.createElement('button');
    button.className = 'btn secondary';
    button.type = 'button';
    button.textContent = option;
    button.addEventListener('click', () => WingsMath.quizExam.submitAnswer(option));
    optionsContainer.appendChild(button);
  });
};

WingsMath.quizExam.submitAnswer = function(answer) {
  const session = WingsMath.quizExam.session;
  if (!session) return;

  const current = session.questions[session.current];
  if (!current) return;

  const isCorrect = answer === current.answer;
  if (isCorrect) {
    session.correct += 1;
  } else {
    session.wrong += 1;
  }

  session.topicCounts[current.topic] = (session.topicCounts[current.topic] || 0) + 1;
  session.current += 1;
  WingsMath.quizExam.renderCurrentQuestion();
};

WingsMath.quizExam.finishExam = function() {
  const result = document.getElementById('examResult');
  if (!result || !WingsMath.quizExam.session) return;

  const session = WingsMath.quizExam.session;
  const percent = session.questions.length > 0 ? Math.round((session.correct / session.questions.length) * 100) : 0;
  result.innerHTML = `
    <div class="result-box">
      <h4>Keputusan</h4>
      <p>Betul: ${session.correct}</p>
      <p>Salah: ${session.wrong}</p>
      <p>Peratusan: ${percent}%</p>
    </div>
  `;

  WingsMath.dashboard.recordSession({ correct: session.correct, wrong: session.wrong, topicCounts: session.topicCounts });
  WingsMath.quizExam.session = null;
};

WingsMath.quizExam.updateStatus = function(message) {
  const result = document.getElementById('examResult');
  if (!result) return;
  result.innerHTML = `<p class="muted">${message}</p>`;
};

WingsMath.quizExam.shuffle = function(array) {
  return array.slice().sort(() => Math.random() - 0.5);
};
