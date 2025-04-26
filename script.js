const emojis = [
  '🍕', '🚗', '🐶', '🌈', '⚽', '🎸', '🍦', '👾'
];
let board = [];
let flipped = [];
let matched = [];
let moves = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  matched = [];
  flipped = [];
  moves = 0;
  document.getElementById('status').textContent = '';

  // Duplicate emojis to have pairs, then shuffle
  board = shuffle([...emojis, ...emojis]);
  board.forEach((emoji, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = idx;
    card.innerHTML = `<span class="emoji">${emoji}</span>`;
    card.addEventListener('click', () => flipCard(card, idx));
    gameBoard.appendChild(card);
  });
}

function flipCard(card, idx) {
  if (flipped.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.classList.add('flipped');
  flipped.push(idx);

  if (flipped.length === 2) {
    moves++;
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [i1, i2] = flipped;
  const cards = document.querySelectorAll('.card');
  if (board[i1] === board[i2]) {
    cards[i1].classList.add('matched');
    cards[i2].classList.add('matched');
    matched.push(i1, i2);
    if (matched.length === board.length) {
      document.getElementById('status').textContent = `You won in ${moves} moves! 🎉`;
    }
  } else {
    cards[i1].classList.remove('flipped');
    cards[i2].classList.remove('flipped');
  }
  flipped = [];
}

document.getElementById('restart').addEventListener('click', createBoard);
window.onload = createBoard;
