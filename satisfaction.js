/**
 * NOTE: If you are having difficulty completing this exercise,
 * please take a look at our example in the file "sample.js"!
 */

function compareFastFood(fastFood1, fastFood2) {
  if (fastFood1.valueForMoney !== fastFood2.valueForMoney) {
    return fastFood1.valueForMoney - fastFood2.valueForMoney;
  }

  if (fastFood1.taste !== fastFood2.taste) {
    return fastFood1.taste - fastFood2.taste;
  }

  if (fastFood1.timeToMake !== fastFood2.timeToMake) {
    return fastFood1.timeToMake - fastFood2.timeToMake;
  }

  if (fastFood1.foodVariety !== fastFood2.foodVariety) {
    return fastFood1.foodVariety - fastFood2.foodVariety;
  }

  if (fastFood1.customerService !== fastFood2.customerService) {
    return fastFood1.customerService - fastFood2.customerService;
  }

  return fastFood2.name.toLowerCase().localeCompare(fastFood1.name.toLowerCase());
}

function getSatisfaction(fastFood) {
  return (
    fastFood.valueForMoney +
    fastFood.taste +
    fastFood.timeToMake +
    fastFood.foodVariety +
    fastFood.customerService
  ) / 5;
}

function compareSatisfaction(fastFood1, fastFood2) {
  if (fastFood1.satisfaction !== fastFood2.satisfaction) {
    return fastFood1.satisfaction - fastFood2.satisfaction;
  }

  return fastFood2.restaurantName.toLowerCase().localeCompare(
    fastFood1.restaurantName.toLowerCase()
  );
}

/**
 * Given an array of fast food restaurants, return a new sorted
 * array in descending order by:
 *
 *   1. valueForMoney
 *   2. taste
 *   3. timeToMake
 *   4. foodVariety
 *   5. customerService
 *   6. name (in lexicographical order, case-insensitive)
 *
 * For example, if two restaurants have the same valueForMoney and taste,
 * the one with a higher timeToMake will be in front
 * (nearer to the start of the returned array).
 *
 * If the all other fields are equal and the name is compared,
 * "hungry Jacks" will be before "KFC" because "h" is before "K".
 *
 * WARNING: You should NOT modify the order of the original array.
 *
 * @param {
 *   Array<{
 *     name: string,
 *     valueForMoney: number,
 *     taste: number,
 *     timeToMake: number,
 *     foodVariety: number,
 *     customerService: number
 *   }>
 * } fastFoodArray with information about fast food restaurants,
 * which should not be modified.
 * @returns array with the same items, sorted by the key-order given.
 */
export function sortedFastFood(fastFoodArray) {
  const newarray = [];

  for (let i of fastFoodArray) {
    let x = 0;
    while (x < newarray.length && compareFastFood(i, newarray[x]) < 0) {
      x++;
    }
    newarray.splice(x, 0, i);
  }

  return newarray;
}

/**
 * Given an array of fast food restaurants, return a new sorted
 * array ranked by the overall satisfaction.
 *
 * The satisfaction of a restaurant is the average score between
 * customerService, foodVariety, valueForMoney, timeToMake and taste.
 *
 * You do not need to round the satisfaction value.
 *
 * If two restaurants have the same satisfaction, the names
 * are compared in lexigraphical order (case-insensitive).
 * For example, "hungry Jacks" will appear before "KFC" because
 * "h" is before "K".
 *
 * WARNING: you should NOT modify the order of the original array.
 *
 * @param {
 *   Array<{
 *     name: string,
 *     valueForMoney: number,
 *     taste: number,
 *     timeToMake: number,
 *     foodVariety: number,
 *     customerService: number
 *   }>
 * } fastFoodArray with information about fast food restaurants,
 * which should not be modified.
 * @returns {
 *   Array<{
 *     restaurantName: string,
 *     satisfaction: number,
 *   }>
 * } a new sorted array based on satisfaction. The restaurantName
 * will be the same as the original name given.
 */
export function sortedSatisfaction(fastFoodArray) {
  const newarray = [];

  for (let i of fastFoodArray) {
    const x = {
      restaurantName: i.name,
      satisfaction: getSatisfaction(i),
    };

    let y = 0;
    while (y < newarray.length && compareSatisfaction(x, newarray[y]) < 0) {
      y++;
    }
    newarray.splice(y, 0, x);
  }

  return newarray;
}

// ========================================================================= //

/**
 * Execute the file with:
 *     $ node satisfaction.js
 *
 * The expected/sample output for the starter code is in the README.md.
 * Feel free to modify the code below to further test your functions.
 */

// Note: do not use this "fastFoods" global variable directly in your function.
// Your function has the parameter "fastFoodArray".
const fastFoods = [
  {
    name: 'Third fastFood, third satisfaction (4.6)',
    valueForMoney: 5,
    taste: 4,
    timeToMake: 4,
    foodVariety: 5,
    customerService: 5
  },
  {
    // Same as above, but name starts with "S"
    // which is before "T" (case-insensitive)
    name: 'Second fastFood, second satisfaction (4.6)',
    valueForMoney: 5,
    taste: 4,
    timeToMake: 4,
    foodVariety: 5,
    customerService: 5
  },
  {
    // Best foodVariety, and Best overall
    name: 'First fastFood, first satisfaction (4.8)',
    valueForMoney: 5,
    taste: 5,
    timeToMake: 5,
    foodVariety: 4,
    customerService: 5
  },
];

// Note: We are using console.log because arrays cannot be commpared with ===.
// There are better ways to test which we will explore in future weeks :).
console.log('========================');
console.log('1. Testing Fast Food');
console.log('===========');
console.log(sortedFastFood(fastFoods));
console.log();

console.log('========================');
console.log('2. Testing Satisfaction');
console.log('===========');
console.log(sortedSatisfaction(fastFoods));
console.log();

console.log('========================================================');
console.log(`
  TIP:
    after attempting yourself, if you are still stuck, please take a
    look at sample.js in your respository.
`);
console.log(`
  WARNING:
    do not return an array within an array,
      e.g. [[1, 2, 3]] (wrong) instead of [1, 2, 3] (correct).
    You should only see one set of square brackets in the output.
`);

