/**
 * Compute the sum of the integer array.
 * If the array is empty, the sum is 0.
 *
 * @param {Array<number>} array of integers
 * @returns {number} the sum of the array
 */
export function arraySum(array) {
  let x = 0;
  for (let i of array) {
    x += i;
  }
  return x;
}

/**
 * Compute the product of the given integer array.
 * If the array is empty, the product is 1.
 *
 * @param {Array<number>} array of integers
 * @returns {number} the product of the array
 */
export function arrayProduct(array) {
  let x = 1;
  for (let i of array) {
    x = x * i;
  }
  return x;
}

/**
 * Find the smallest number in the array.
 *
 * @param {Array<number>} array of integers
 * @returns {number|null} the smallest number in the array, or
 * null if the array is empty
 */
export function arrayMin(array) {
  if (array.length === 0) {
    return null;
  }

  let x = array[0];
  for (let i of array) {
    if (i < x) {
      x = i;
    }
  }
  return x;
}

/**
 * Find the largest number in the array.
 *
 * @param {Array<number>} array of integers
 * @returns {number|null} the largest number in the array, or
 * null if the array is empty
 */
export function arrayMax(array) {
  if (array.length === 0) {
    return null;
  }

  let x = array[0];
  for (let i of array) {
    if (i > x) {
      x = i;
    }
  }
  return x;
}

/**
 * Determine if the array contains a particular element.
 *
 * @param {Array<number>} array of integers
 * @param {number} item integer to check
 * @returns {boolean} whether the integer item is in the given array
 */
export function arrayContains(array, item) {
  for (let i of array) {
    if (i === item) {
      return true;
    }
  }
  return false;
}

/**
 * Create an array that is the reversed of the original.
 *
 * WARNING: a reminder that the original(s) array must not be modified.
 * You can create new arrays if needed.
 *
 * @param {Array<number>} array of integers
 * @returns {Array<number>} a new reversed array
 */
export function arrayReversed(array) {
  const newarray = [];
  for (let i = array.length - 1; i >= 0; i--) {
    newarray.push(array[i]);
  }
  return newarray;
}

/**
 * Returns the array with all odd numbers removed.
 *
 * WARNING: a reminder that the original(s) array must not be modified.
 * You can create new arrays if needed.
 *
 * @param {Array<number>} array of integers
 * @returns {Array<number>} array of integers with odd numbers removed
 */
export function removeOdd(array) {
  const newarray = [];
  for (let i of array) {
    if (i % 2 === 0) {
      newarray.push(i);
    }
  }
  return newarray;
}

/**
 * Returns the array with all the elements floored
 * (rounded down to the nearest integer).
 *
 * WARNING: a reminder that the original(s) array must not be modified.
 * You can create new arrays if needed.
 *
 * @param {Array<number>} array of numbers
 * @returns {Array<number>} array of integers
 */
export function floorArray(array) {
  const newarray = [];
  for (let i of array) {
    newarray.push(Math.floor(i));
  }
  return newarray;
}

/**
 * Given two arrays, multiply the elements at each index from arrays and store
 * the result in a third array. If the given two arrays differ in length,
 * excess elements of the larger array will be added on at the end.
 *
 * For example,
 *     [1, 3, 2]
 *   x [2, 4, 3, 5, 9]
 *   -----------------
 *   = [2, 12, 6, 5, 9]
 *
 * The result will be the same if array1 and array2 are swapped.
 *
 * @param {Array<number>} array1 of integers
 * @param {Array<number>} array2 of integers
 * @returns {Array<number>} array1 x array2 at each index
 */
export function arraysMultiply(array1, array2) {
  const newarray = [];
  let x = array1.length;

  if (array2.length > x) {
    x = array2.length;
  }

  for (let i = 0; i < x; i++) {
    if (i < array1.length && i < array2.length) {
      newarray.push(array1[i] * array2[i]);
    } else if (i < array1.length) {
      newarray.push(array1[i]);
    } else {
      newarray.push(array2[i]);
    }
  }

  return newarray;
}

/**
 * Create a third array containing common elements between two arrays.
 *
 * Each element in the first array can map to at most one element
 * in the second array, and vice versa (one-to-one relationship).
 *
 * Duplicated elements in each array are treated as separate entities.
 *
 * The order is determined by the first array.
 *
 * A few examples,
 *   arraysCommon([1,1], [1,1,1]) gives [1,1]
 *   arraysCommon([1,1,1], [1,1]) gives [1,1]
 *   arraysCommon([1,2,3,2,1], [5,4,3,2,1]) gives [1,2,3]
 *   arraysCommon([1,2,3,2,1], [2,2,3,3,4]) gives [2,3,2]
 *   arraysCommon([1,4,1,1,5,9,2,7], [1,8,2,5,1]) gives [1,1,5,2]
 *
 * WARNING: a reminder that the original array(s) must not be modified.
 * You can create new arrays if needed.
 *
 * @param {Array<number>} array1 of integers
 * @param {Array<number>} array2 of integers
 * @returns {Array<number>} common elements between two arrays
 */
export function arraysCommon(array1, array2) {
  const newarray = [];
  const newarray2 = [];

  for (let i of array1) {
    for (let j = 0; j < array2.length; j++) {
      if (newarray2[j] !== true && i === array2[j]) {
        newarray.push(i);
        newarray2[j] = true;
        break;
      }
    }
  }

  return newarray;
}
