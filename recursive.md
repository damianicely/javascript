# Recursive solutions

## Sum All Numbers in a Range

We'll pass you an array of two numbers. Return the sum of those two numbers plus the sum of all the numbers between them. The lowest number will not always come first.

For example, `sumAll([4,1])` should return `10` because sum of all the numbers between 1 and 4 (both inclusive) is 10.

```
function sumAll(arr) {
  return arr[0] > arr[1] ? arr[0] + sumAll([ arr[0]-1, arr[1]])
    : arr[1] > arr[0] ? arr[1] + sumAll([ arr[0], arr[1]-1])
    : arr[0]
}

sumAll([1, 4]);
```
## [Drop it](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/drop-it)



Given the array arr, iterate through and remove each element starting from the first element (the 0 index) until the function func returns true when the iterated element is passed through it.

Then return the rest of the array once the condition is satisfied, otherwise, arr should be returned as an empty array.

```js
function dropElements(arr, func) {
  return func(arr[0]) ? arr
    : (arr.length === 1) ? []
    : dropElements(arr.slice(1), func)
}

const testArray = [
  [[1, 2, 3], function(n) {return n < 3; }],
  [[1, 2, 3, 4], function(n) {return n >= 3;}],
  [[0, 1, 0, 1], function(n) {return n === 1;}],
  [[1, 2, 3], function(n) {return n > 0;}],
  [[1, 2, 3, 4], function(n) {return n > 5;}],
  [[1, 2, 3, 7, 4], function(n) {return n > 3;}],
  [[1, 2, 3, 9, 2], function(n) {return n > 2;}]
]
testArray.forEach(test => console.log(dropElements(test[0],test[1])));
```

## [Steamroller](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/steamroller)

Flatten a nested array. You must account for varying levels of nesting.
Your solution should not use the `Array.prototype.flat()` or `Array.prototype.flatMap()` methods.
```js
'use strict';

const notAnArray = (currentValue) => !Array.isArray(currentValue);

function steamrollArray(arr) {
  if (arr.every(notAnArray)){
    return arr;
  } else {
    let result = [];
    arr.forEach(element => {
      notAnArray(element) ? result.push(element)
      : element.forEach(item => result.push(item))
    });
    return steamrollArray(result)
  }
}

const testArray = [
  [1,[2,3,[4]]],
  [[["a"]], [["b"]]],
  [1, [], [3, [[4]]]],
  [1, {}, [3, [[4]]]],
]
testArray.forEach(test => console.log(steamrollArray(test)));
```

# Complex Object and Array methods

## Seek and Destroy

You will be provided with an initial array (the first argument in the destroyer function), followed by one or more arguments. Remove all elements from the initial array that are of the same value as these arguments.

Note: You have to use the arguments object.

```js
function destroyer(arr) {
  let args = [...arguments].slice(1)
  return arguments[0].filter( x => !args.includes(x));
}
destroyer([1,2,3,4,5],2,3,4);
```
I also like this solution using the spread operator:
```js
function destroyer(arr, ...valsToRemove) {
  return arr.filter(elem => !valsToRemove.includes(elem));
}
```

