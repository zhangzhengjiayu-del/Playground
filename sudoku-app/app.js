const STORAGE_KEY = 'advanced-sudoku-state-v1';
const TOTAL_TIME_KEY = 'advanced-sudoku-total-seconds-v1';
const COMPLETED_COUNT_KEY = 'advanced-sudoku-completed-count-v1';

const DIFFICULTIES = {
  gentle: { label: 'Soft', givens: 46 },
  steady: { label: 'Easy', givens: 40 },
  sharp: { label: 'Hard', givens: 34 },
  expert: { label: 'Expert', givens: 29 },
  master: { label: 'Master', givens: 24 }
};

const TIPS = [
  {
    title: 'XY-Wing: three cells, one clean delete',
    body: 'Find a pivot cell with only XY. Then find two wing cells that see the pivot: one XZ and one YZ. Any cell that sees both wings cannot keep Z, because whichever value the pivot takes, one wing is forced to become Z.'
  },
  {
    title: 'Unique Rectangle: protect the single solution',
    body: 'When four corners across two rows and two columns almost all contain the same pair AB, watch for a rectangle. If three corners are only AB and the fourth has extra candidates, remove the risky AB from that fourth corner when the pattern would otherwise allow two solutions.'
  },
  {
    title: 'Strong and weak links: candidates as switches',
    body: 'If a number appears only twice in a row, column, or box, those two candidates form a strong link. One false means the other true. Chain strong and weak links together; if both ends are the same number and see each other, shared peers can delete that number.'
  },
  {
    title: 'Fish patterns: read rows and columns',
    body: 'X-Wing, Swordfish, and Jellyfish all track one digit. If a digit in N rows is locked into the same N columns, every other cell in those columns loses that digit. The key is the closed row-column net, not the boxes.'
  },
  {
    title: 'ALS: almost locked sets',
    body: 'An ALS has N cells with N+1 total candidates. It is one step away from being locked. If two ALS groups share a restricted candidate R, another candidate Z that appears in both groups can often be removed from cells that see both groups.'
  }
];

const homeScreenEl = document.querySelector('#homeScreen');
const gameScreenEl = document.querySelector('#gameScreen');
const boardEl = document.querySelector('#board');
const padEl = document.querySelector('#numberPad');
const noteBtn = document.querySelector('#noteBtn');
const difficultySelect = document.querySelector('#difficultySelect');
const gameTimerEl = document.querySelector('#gameTimer');
const totalTimerEl = document.querySelector('#totalTimer');
const completedCountEl = document.querySelector('#completedCount');
const homeCompletedCountEl = document.querySelector('#homeCompletedCount');
const homeTotalTimerEl = document.querySelector('#homeTotalTimer');
const toastEl = document.querySelector('#toast');
const rewardEl = document.querySelector('#reward');
const rewardTextEl = document.querySelector('#rewardText');
const tipTitleEl = document.querySelector('#tipTitle');
const tipBodyEl = document.querySelector('#tipBody');

let state = hydrateState(loadState()) || createGame('steady');
let selectedIndex = firstEmptyIndex(state.cells) ?? 0;
let noteMode = false;
let gameActive = false;
let toastTimer;
let totalSeconds = Number(localStorage.getItem(TOTAL_TIME_KEY) || '0');
let completedCount = Number(localStorage.getItem(COMPLETED_COUNT_KEY) || '0');
let lastTick = Date.now();

init();

function init() {
  difficultySelect.value = state.difficulty;
  renderPad();
  renderTip(state.tipIndex ?? randomInt(TIPS.length));
  bindEvents();
  showHome();
  setInterval(tickTimers, 1000);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

function bindEvents() {
  boardEl.addEventListener('click', (event) => {
    const cell = event.target.closest('.cell');
    if (!cell) return;
    selectedIndex = Number(cell.dataset.index);
    render();
  });

  padEl.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-number]');
    if (!button || button.disabled) return;
    playNumber(Number(button.dataset.number));
  });

  noteBtn.addEventListener('click', () => {
    noteMode = !noteMode;
    noteBtn.setAttribute('aria-pressed', String(noteMode));
    noteBtn.classList.toggle('active', noteMode);
  });

  document.querySelector('#homeNewBtn').addEventListener('click', () => startNewGame(difficultySelect.value));
  document.querySelector('#homeContinueBtn').addEventListener('click', continueGame);
  document.querySelector('#newGameBtn').addEventListener('click', () => startNewGame(difficultySelect.value));
  difficultySelect.addEventListener('change', () => startNewGame(difficultySelect.value));
  document.querySelector('#eraseBtn').addEventListener('click', eraseSelected);
  document.querySelector('#checkBtn').addEventListener('click', checkBoard);
  document.querySelector('#hintBtn').addEventListener('click', () => renderTip(nextTipIndex()));
  document.querySelector('#nextTipBtn').addEventListener('click', () => renderTip(nextTipIndex()));
  document.querySelector('#rewardBtn').addEventListener('click', () => {
    rewardEl.classList.remove('show');
    startNewGame(state.difficulty);
  });
}

function tickTimers() {
  const now = Date.now();
  const delta = Math.max(1, Math.round((now - lastTick) / 1000));
  lastTick = now;
  if (gameActive && !state.completed) {
    state.elapsed += delta;
    totalSeconds += delta;
    localStorage.setItem(TOTAL_TIME_KEY, String(totalSeconds));
    saveState();
  }
  renderStats();
}

function showHome() {
  gameActive = false;
  homeScreenEl.hidden = false;
  gameScreenEl.hidden = true;
  renderStats();
}

function showGame() {
  gameActive = true;
  lastTick = Date.now();
  homeScreenEl.hidden = true;
  gameScreenEl.hidden = false;
  render();
}

function continueGame() {
  if (state.completed) {
    startNewGame(state.difficulty);
    return;
  }
  selectedIndex = firstEmptyIndex(state.cells) ?? selectedIndex;
  showGame();
}

function startNewGame(difficulty) {
  state = createGame(difficulty);
  selectedIndex = firstEmptyIndex(state.cells) ?? 0;
  noteMode = false;
  noteBtn.setAttribute('aria-pressed', 'false');
  noteBtn.classList.remove('active');
  lastTick = Date.now();
  difficultySelect.value = difficulty;
  saveState();
  showGame();
}

function playNumber(number) {
  const cell = state.cells[selectedIndex];
  if (!cell || cell.given || state.completed) return;

  if (noteMode) {
    if (cell.value === number) return;
    if (!canAddNote(selectedIndex, number)) {
      showToast('Already in this row, column, or box.');
      return;
    }
    toggleNote(cell, number);
  } else {
    cell.value = number;
    cell.notes = [];
    cleanupPeerNotes(selectedIndex, number);
    if (number !== state.solution[selectedIndex]) {
      cell.error = true;
      showToast('Not quite. Keeping it marked.');
    } else {
      cell.error = false;
    }
  }

  saveState();
  render();
  if (isSolved()) completeGame();
}

function eraseSelected() {
  const cell = state.cells[selectedIndex];
  if (!cell || cell.given || state.completed) return;
  cell.value = 0;
  cell.notes = [];
  cell.error = false;
  saveState();
  render();
}

function checkBoard() {
  const wrong = state.cells.findIndex((cell, index) => cell.value && cell.value !== state.solution[index]);
  if (wrong >= 0) {
    selectedIndex = wrong;
    state.cells[wrong].error = true;
    showToast('One number is off. I selected it.');
  } else if (state.cells.every((cell) => cell.value)) {
    completeGame();
  } else {
    showToast('Everything filled so far is right.');
  }
  saveState();
  render();
}

function completeGame() {
  if (state.completed) return;
  state.completed = true;
  completedCount += 1;
  localStorage.setItem(COMPLETED_COUNT_KEY, String(completedCount));
  saveState();
  renderStats();
  rewardTextEl.textContent = `${DIFFICULTIES[state.difficulty].label} in ${formatTime(state.elapsed)}. ${completedCount} wins total.`;
  rewardEl.classList.add('show');
  launchConfetti();
}

function render() {
  boardEl.innerHTML = '';
  const selected = state.cells[selectedIndex];
  const selectedValue = selected?.value;
  for (let i = 0; i < 81; i += 1) {
    const cell = state.cells[i];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'cell';
    button.dataset.index = String(i);
    button.setAttribute('role', 'gridcell');
    button.setAttribute('aria-label', cellLabel(i, cell));
    button.classList.toggle('given', cell.given);
    button.classList.toggle('selected', i === selectedIndex);
    button.classList.toggle('peer', isPeer(i, selectedIndex) && i !== selectedIndex);
    button.classList.toggle('same-number', Boolean(selectedValue && cell.value === selectedValue));
    button.classList.toggle('error', cell.error);
    button.classList.toggle('player-value', Boolean(cell.value && !cell.given));
    button.classList.add(`row-${Math.floor(i / 9)}`, `col-${i % 9}`);

    if (cell.value) {
      button.textContent = cell.value;
    } else {
      const notes = document.createElement('span');
      notes.className = 'notes';
      for (let n = 1; n <= 9; n += 1) {
        const mark = document.createElement('span');
        mark.textContent = cell.notes.includes(n) ? String(n) : '';
        notes.append(mark);
      }
      button.append(notes);
    }
    boardEl.append(button);
  }
  renderPadState();
  renderStats();
}

function renderPad() {
  padEl.innerHTML = '';
  for (let n = 1; n <= 9; n += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.number = String(n);
    button.innerHTML = `<strong>${n}</strong><span></span>`;
    padEl.append(button);
  }
}

function renderPadState() {
  const counts = countValues();
  padEl.querySelectorAll('button[data-number]').forEach((button) => {
    const number = Number(button.dataset.number);
    const left = 9 - counts[number];
    button.disabled = left <= 0;
    button.classList.toggle('used-up', left <= 0);
    button.querySelector('span').textContent = left > 0 ? `${left} left` : '';
  });
}

function renderStats() {
  gameTimerEl.textContent = formatTime(state.elapsed);
  totalTimerEl.textContent = `${formatTime(totalSeconds)} total`;
  completedCountEl.textContent = `${completedCount} wins`;
  homeCompletedCountEl.textContent = String(completedCount);
  homeTotalTimerEl.textContent = `${formatTime(totalSeconds)} total`;
}

function renderTip(index) {
  state.tipIndex = index;
  const tip = TIPS[index];
  tipTitleEl.textContent = tip.title;
  tipBodyEl.textContent = tip.body;
  saveState();
}

function nextTipIndex() {
  return (state.tipIndex + 1 + randomInt(TIPS.length - 1)) % TIPS.length;
}

function canAddNote(index, number) {
  return peersOf(index).every((peer) => state.cells[peer].value !== number);
}

function toggleNote(cell, number) {
  if (cell.notes.includes(number)) {
    cell.notes = cell.notes.filter((note) => note !== number);
  } else {
    cell.notes = [...cell.notes, number].sort((a, b) => a - b);
  }
}

function cleanupPeerNotes(index, number) {
  for (const peer of peersOf(index)) {
    state.cells[peer].notes = state.cells[peer].notes.filter((note) => note !== number);
  }
}

function isSolved() {
  return state.cells.every((cell, index) => cell.value === state.solution[index]);
}

function countValues() {
  const counts = Array(10).fill(0);
  for (const cell of state.cells) {
    if (cell.value) counts[cell.value] += 1;
  }
  return counts;
}

function createGame(difficulty) {
  const solution = generateSolvedBoard();
  const puzzle = digPuzzle(solution, DIFFICULTIES[difficulty].givens);
  return {
    difficulty,
    solution,
    elapsed: 0,
    completed: false,
    tipIndex: randomInt(TIPS.length),
    cells: puzzle.map((value) => ({ value, given: value !== 0, notes: [], error: false }))
  };
}

function generateSolvedBoard() {
  const board = Array(81).fill(0);
  fillBoard(board, 0);
  return board;
}

function fillBoard(board, index) {
  if (index >= 81) return true;
  if (board[index]) return fillBoard(board, index + 1);
  for (const number of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    if (isLegal(board, index, number)) {
      board[index] = number;
      if (fillBoard(board, index + 1)) return true;
      board[index] = 0;
    }
  }
  return false;
}

function digPuzzle(solution, givens) {
  const puzzle = [...solution];
  const positions = shuffle([...Array(81).keys()]);
  let filled = 81;
  for (const index of positions) {
    if (filled <= givens) break;
    const backup = puzzle[index];
    puzzle[index] = 0;
    if (countSolutions([...puzzle], 2) !== 1) {
      puzzle[index] = backup;
    } else {
      filled -= 1;
    }
  }
  return puzzle;
}

function countSolutions(board, limit) {
  const index = findBestEmpty(board);
  if (index === -1) return 1;
  let count = 0;
  for (const number of candidatesFor(board, index)) {
    board[index] = number;
    count += countSolutions(board, limit);
    board[index] = 0;
    if (count >= limit) return count;
  }
  return count;
}

function findBestEmpty(board) {
  let best = -1;
  let bestCount = 10;
  for (let i = 0; i < 81; i += 1) {
    if (board[i]) continue;
    const count = candidatesFor(board, i).length;
    if (count < bestCount) {
      best = i;
      bestCount = count;
      if (count === 1) break;
    }
  }
  return best;
}

function candidatesFor(board, index) {
  const result = [];
  for (let n = 1; n <= 9; n += 1) {
    if (isLegal(board, index, n)) result.push(n);
  }
  return result;
}

function isLegal(board, index, number) {
  return peersOf(index).every((peer) => board[peer] !== number);
}

function peersOf(index) {
  const row = Math.floor(index / 9);
  const col = index % 9;
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  const peers = new Set();
  for (let i = 0; i < 9; i += 1) {
    peers.add(row * 9 + i);
    peers.add(i * 9 + col);
  }
  for (let r = boxRow; r < boxRow + 3; r += 1) {
    for (let c = boxCol; c < boxCol + 3; c += 1) {
      peers.add(r * 9 + c);
    }
  }
  peers.delete(index);
  return [...peers];
}

function isPeer(a, b) {
  if (a === b) return false;
  const ar = Math.floor(a / 9);
  const ac = a % 9;
  const br = Math.floor(b / 9);
  const bc = b % 9;
  return ar === br || ac === bc || (Math.floor(ar / 3) === Math.floor(br / 3) && Math.floor(ac / 3) === Math.floor(bc / 3));
}

function firstEmptyIndex(cells) {
  const index = cells.findIndex((cell) => !cell.value);
  return index >= 0 ? index : null;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved?.cells || !saved?.solution || saved.cells.length !== 81 || saved.solution.length !== 81) return null;
    return saved;
  } catch {
    return null;
  }
}

function hydrateState(saved) {
  if (!saved) return null;
  return {
    difficulty: saved.difficulty in DIFFICULTIES ? saved.difficulty : 'steady',
    solution: [...saved.solution],
    elapsed: Number(saved.elapsed || 0),
    completed: Boolean(saved.completed),
    tipIndex: Number.isInteger(saved.tipIndex) ? saved.tipIndex % TIPS.length : 0,
    cells: saved.cells.map((cell, index) => ({
      value: Number(cell.value || 0),
      given: Boolean(cell.given),
      notes: Array.isArray(cell.notes) ? cell.notes.filter((n) => Number.isInteger(n) && n >= 1 && n <= 9) : [],
      error: Boolean(cell.error),
      index
    }))
  };
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function showToast(message) {
  clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

function launchConfetti() {
  const sparkles = rewardEl.querySelector('.sparkles');
  sparkles.innerHTML = '';
  for (let i = 0; i < 38; i += 1) {
    const piece = document.createElement('i');
    piece.style.setProperty('--x', `${randomInt(260) - 130}px`);
    piece.style.setProperty('--y', `${randomInt(220) - 170}px`);
    piece.style.setProperty('--delay', `${randomInt(300)}ms`);
    piece.style.setProperty('--hue', String(20 + randomInt(190)));
    sparkles.append(piece);
  }
}

function cellLabel(index, cell) {
  const row = Math.floor(index / 9) + 1;
  const col = (index % 9) + 1;
  return `Row ${row}, column ${col}, ${cell.value ? cell.value : 'empty'}`;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}
