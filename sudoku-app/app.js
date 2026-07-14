const STORAGE_KEY = 'advanced-sudoku-state-v1';
const TOTAL_TIME_KEY = 'advanced-sudoku-total-seconds-v1';

const DIFFICULTIES = {
  gentle: { label: '入门', givens: 46 },
  steady: { label: '普通', givens: 40 },
  sharp: { label: '困难', givens: 34 },
  expert: { label: '专家', givens: 29 },
  master: { label: '大师', givens: 24 }
};

const TIPS = [
  {
    title: 'XY-Wing：用三个双值格制造删数链',
    body: '找一个只剩 XY 的枢纽格，再找两个与它分别互相可见的翼格：一个是 XZ，另一个是 YZ。如果某个格子同时看得见两个翼格，那么它不能填 Z。原因是枢纽不管取 X 还是 Y，都会迫使其中一个翼格取 Z，所以共同可见格里的 Z 一定是假候选。'
  },
  {
    title: '唯一矩形：避免双解的高级排除',
    body: '当两行两列的四个角几乎都只含同一对候选 AB 时，要警惕唯一矩形。如果其中三个角只有 AB，而第四角还有 AB 以外的候选，那么第四角通常不能只靠 AB 留下，否则谜题会形成两个解。优先删除第四角中的 A 或 B，保留破坏矩形的额外候选。'
  },
  {
    title: '强链弱链：把候选当成逻辑开关',
    body: '某个数字在一个单位中只出现两次时，这两个候选形成强链：一个假则另一个真。两个相互可见的同数候选形成弱链：一个真则另一个假。把强弱链交替串起来，如果链两端是同一个数字且互相可见，就能删除它们共同可见位置中的这个候选。'
  },
  {
    title: '鱼形结构：从行列分布删候选',
    body: 'X-Wing、Swordfish、Jellyfish 都是在若干行里观察同一个数字。如果这个数字在 N 行中只落在同样 N 列里，那么这些列的其他格不能再有这个数字。关键不是看宫，而是看候选在行列之间形成的封闭矩形或网格。'
  },
  {
    title: 'ALS：几乎锁定集合',
    body: '一个区域里有 N 个格子，却总共只有 N+1 种候选，这叫几乎锁定集合。它离“锁定”只差一步。若两个 ALS 共享一个受限候选 R，且所有 R 互相可见，那么另一个同时出现在两个 ALS 中的候选 Z，可以从共同可见位置删除。这个技巧适合卡在专家题末段时使用。'
  }
];

const boardEl = document.querySelector('#board');
const padEl = document.querySelector('#numberPad');
const noteBtn = document.querySelector('#noteBtn');
const difficultySelect = document.querySelector('#difficultySelect');
const gameTimerEl = document.querySelector('#gameTimer');
const totalTimerEl = document.querySelector('#totalTimer');
const toastEl = document.querySelector('#toast');
const rewardEl = document.querySelector('#reward');
const rewardTextEl = document.querySelector('#rewardText');
const tipTitleEl = document.querySelector('#tipTitle');
const tipBodyEl = document.querySelector('#tipBody');

let state = hydrateState(loadState()) || createGame('steady');
let selectedIndex = firstEmptyIndex(state.cells) ?? 0;
let noteMode = false;
let toastTimer;
let totalSeconds = Number(localStorage.getItem(TOTAL_TIME_KEY) || '0');
let lastTick = Date.now();

init();

function init() {
  difficultySelect.value = state.difficulty;
  renderPad();
  renderTip(state.tipIndex ?? randomInt(TIPS.length));
  bindEvents();
  render();
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
  if (!state.completed) {
    state.elapsed += delta;
    totalSeconds += delta;
    localStorage.setItem(TOTAL_TIME_KEY, String(totalSeconds));
    saveState();
  }
  gameTimerEl.textContent = formatTime(state.elapsed);
  totalTimerEl.textContent = `总计 ${formatTime(totalSeconds)}`;
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
  render();
}

function playNumber(number) {
  const cell = state.cells[selectedIndex];
  if (!cell || cell.given || state.completed) return;

  if (noteMode) {
    if (cell.value === number) return;
    if (!canAddNote(selectedIndex, number)) {
      showToast('这个数字已在同宫、同行或同列中出现，不能记入候选。');
      return;
    }
    toggleNote(cell, number);
  } else {
    cell.value = number;
    cell.notes = [];
    cleanupPeerNotes(selectedIndex, number);
    if (number !== state.solution[selectedIndex]) {
      cell.error = true;
      showToast('这个位置不对，先保留给你检查。');
    } else {
      cell.error = false;
      moveSelectionForward();
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
    showToast('有一个填入数字不对，已经帮你选中。');
  } else if (state.cells.every((cell) => cell.value)) {
    completeGame();
  } else {
    showToast('目前填入的数字都正确。');
  }
  saveState();
  render();
}

function completeGame() {
  if (state.completed) return;
  state.completed = true;
  saveState();
  rewardTextEl.textContent = `${DIFFICULTIES[state.difficulty].label}难度，用时 ${formatTime(state.elapsed)}。`;
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
  gameTimerEl.textContent = formatTime(state.elapsed);
  totalTimerEl.textContent = `总计 ${formatTime(totalSeconds)}`;
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
    button.querySelector('span').textContent = left > 0 ? `剩${left}` : '';
  });
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

function moveSelectionForward() {
  const next = state.cells.findIndex((cell, index) => index > selectedIndex && !cell.value);
  selectedIndex = next >= 0 ? next : firstEmptyIndex(state.cells) ?? selectedIndex;
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
  return `第${row}行第${col}列，${cell.value ? cell.value : '空格'}`;
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
