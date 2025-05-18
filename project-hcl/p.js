const flashcards = [];

const subjectKeywords = {
  Biology: ['photosynthesis', 'cell', 'mitosis', 'organism', 'enzyme', 'dna'],
  Physics: ['velocity', 'force', 'acceleration', 'quantum', 'energy', 'gravity'],
  Chemistry: ['atom', 'molecule', 'reaction', 'bond', 'acid', 'base'],
  Math: ['integral', 'derivative', 'algebra', 'matrix', 'calculus', 'equation'],
  History: ['revolution', 'empire', 'war', 'treaty', 'king', 'ancient']
};

function inferSubject(question) {
  const lower = question.toLowerCase();
  for (const [subject, keywords] of Object.entries(subjectKeywords)) {
    if (keywords.some(keyword => lower.includes(keyword))) {
      return subject;
    }
  }
  return 'General';
}

function addFlashcard() {
  const studentId = document.getElementById('studentId').value.trim();
  const question = document.getElementById('question').value.trim();
  const answer = document.getElementById('answer').value.trim();

  if (!studentId || !question || !answer) {
    alert('Please fill in all fields.');
    return;
  }

  const subject = inferSubject(question);

  flashcards.push({ studentId, question, answer, subject });

  document.getElementById('question').value = '';
  document.getElementById('answer').value = '';

  alert('Flashcard added successfully!');
}

function getMixedFlashcards() {
  const studentId = document.getElementById('studentId').value.trim();
  const limit = parseInt(document.getElementById('limit').value);
  const container = document.getElementById('flashcardList');

  container.innerHTML = '';

  if (!studentId) {
    alert('Enter Student ID to fetch flashcards.');
    return;
  }

  const userCards = flashcards.filter(f => f.studentId === studentId);
  const subjectBuckets = {};

  for (const card of userCards) {
    if (!subjectBuckets[card.subject]) {
      subjectBuckets[card.subject] = [];
    }
    subjectBuckets[card.subject].push(card);
  }

  const mixed = [];
  let added = 0;

  while (added < limit) {
    for (const subject in subjectBuckets) {
      if (subjectBuckets[subject].length && added < limit) {
        mixed.push(subjectBuckets[subject].pop());
        added++;
      }
    }
    if (Object.values(subjectBuckets).every(bucket => bucket.length === 0)) break;
  }

  // Shuffle the flashcards
  mixed.sort(() => Math.random() - 0.5);

  // Display
  for (const card of mixed) {
    const div = document.createElement('div');
    div.className = 'flashcard';
    div.innerHTML = `
      <h3>${card.subject}</h3>
      <p><strong>Q:</strong> ${card.question}</p>
      <p><strong>A:</strong> ${card.answer}</p>
    `;
    container.appendChild(div);
  }
}
