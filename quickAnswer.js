window.WingsMath = window.WingsMath || {};
var WingsMath = window.WingsMath;
WingsMath.quickAnswer = WingsMath.quickAnswer || {};

WingsMath.quickAnswer.initialize = function() {
  const topicSelect = document.getElementById('quickTopic');
  const answerButton = document.getElementById('quickAnswerBtn');
  if (!topicSelect || !answerButton) return;

  const topics = [...new Set(questions.map(item => item.topic))].sort();
  topicSelect.innerHTML = topics.map(topic => `<option value="${topic}">${topic}</option>`).join('');
  answerButton.addEventListener('click', WingsMath.quickAnswer.showAnswer);
};

WingsMath.quickAnswer.showAnswer = function() {
  const topic = document.getElementById('quickTopic')?.value;
  const questionNumber = Number(document.getElementById('quickQuestionNumber')?.value);
  const resultBox = document.getElementById('quickAnswerResult');
  if (!resultBox) return;
  if (!topic || !questionNumber) {
    resultBox.textContent = 'Sila pilih topik dan masukkan nombor soalan.';
    return;
  }

  const topicQuestions = questions.filter(item => item.topic === topic);
  const question = topicQuestions[questionNumber - 1];
  if (!question) {
    resultBox.textContent = 'Soalan tidak dijumpai. Sila cuba nombor lain.';
    return;
  }

  resultBox.innerHTML = `
    <p><strong>Soalan:</strong> ${question.question}</p>
    <p><strong>Jawapan:</strong> ${question.answer}</p>
    <p class="muted">Topik: ${question.topic} · Tahap: ${question.level}</p>
  `;
};
