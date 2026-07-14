const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const solution = generateSolvedBoard();
assert(solution.length === 81, 'solution length');
assert(new Set(solution).size >= 5, 'solution diversity');

const puzzle = digPuzzle(solution, 34);
assert(puzzle.length === 81, 'puzzle length');
assert(puzzle.filter(Boolean).length >= 34, 'puzzle givens');
assert(countSolutions([...puzzle], 2) === 1, 'unique solution');

console.log('generator ok');

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

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
