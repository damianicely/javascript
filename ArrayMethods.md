# Record Collection

You are given an object literal representing a part of your musical album collection. Each album has a unique id number as its key and several other properties. Not all albums have complete information.

You start with an updateRecords function that takes an object literal, records, containing the musical album collection, an id, a prop (like artist or tracks), and a value. Complete the function using the rules below to modify the object passed to the function.

    Your function must always return the entire record collection object.
    If prop isn't tracks and value isn't an empty string, update or set that album's prop to value.
    If prop is tracks but the album doesn't have a tracks property, create an empty array and add value to it.
    If prop is tracks and value isn't an empty string, add value to the end of the album's existing tracks array.
    If value is an empty string, delete the given prop property from the album.

Note: A copy of the recordCollection object is used for the tests.

```js
var recordCollection = {
    2548: {
      albumTitle: 'Slippery When Wet',
      artist: 'Bon Jovi',
      tracks: ['Let It Rock', 'You Give Love a Bad Name']
    },
    2468: {
      albumTitle: '1999',
      artist: 'Prince',
      tracks: ['1999', 'Little Red Corvette']
    },
    1245: {
      artist: 'Robert Palmer',
      tracks: []
    },
    5439: {
      albumTitle: 'ABBA Gold'
    }
  };
  
  // Only change code below this line
  function updateRecords(records, id, prop, value) {
    if (prop !== "tracks" && value !== ""){
        console.log("chose 1");
        records[id][prop] = value;
    } else if(prop == "tracks" && !records[id].hasOwnProperty("tracks")){
        console.log("chose 2");
        records[id][prop] = [value];
    } else if(prop == "tracks" && value !== ""){
        console.log("chose 3");
        records[id]["tracks"].push(value);
    } else if(value === ""){
        console.log("chose 4");
        delete records[id][prop];
    }
    console.log(records);
    return records;
  }
  
updateRecords(recordCollection, 2468, 'tracks', 'Boogie Woogie Oogie');
```

## ForEach + for..in Array+ Object loop

### [Wherefore art thou](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/wherefore-art-thou)

Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching name and value pairs (second argument). Each name and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.
For example, if the first argument is `[{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }]`, and the second argument is `{ last: "Capulet" }`, then you must return the third object from the array (the first argument), because it contains the name and its value, that was passed on as the second argument.

```js

function whatIsInAName(collection, source) {
  const arr = [];
  // Only change code below this line
  collection.forEach(element => {
    let allHere = true;
    for(let property in source){
      if(source[property] != element[property]) allHere = false;
    }
    if(allHere) arr.push(element);
  });
  return arr;
  // Only change code above this line
}
```

## [DNA Pairing](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/dna-pairing)

The DNA strand is missing the pairing element. Take each character, get its pair, and return the results as a 2d array.

Base pairs are a pair of AT and CG. Match the missing element to the provided character.

Return the provided character as the first element in each array.

For example, for the input GCG, return [["G", "C"], ["C","G"], ["G", "C"]]

The character and its pair are paired up in an array, and all the arrays are grouped into one encapsulating array.

```js
"use strict";
function pairElement(str) {
    return str.split('').map(x => x == "G" ? [x,"C"]
      : x == "C" ? [x,"G"]
      : x == "A" ? [x,"T"]
      : [x,"A"]
  );
}
const testArray = ["GCG","ATCGA","TTGAG","CTCTA"]
testArray.forEach(test => console.log( pairElement(test)));
```

## [Sorted Union](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/sorted-union)

### This one was tricksy!

Write a function that takes two or more arrays and returns a new array of unique values in the order of the original provided arrays.

In other words, all values present from all arrays should be included in their original order, but with no duplicates in the final array.

The unique numbers should be sorted by their original order, but the final array should not be sorted in numerical order.

```js
"use strict";

 let inArray = (num, array) => array.indexOf(num) !== -1 ? true : false;

function uniteUnique(arr) {
  let returnArr = [];
  const myArrays = [...arguments];
  myArrays.forEach(array => {
    array.forEach(num => {
      if(!inArray(num,returnArr)){
        returnArr.push(num);
      }
    })
  })
  return returnArr;
}


const testArray = [
  [[1, 3, 2], [5, 2, 1, 4], [2, 1]],
  [[1, 2, 3], [5, 2, 1]],
  [[1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]]];
testArray.forEach(test => console.log(uniteUnique(...test)));
```

### Redux Solution
```js
function uniteUnique(arr1, arr2, arr3) {
  var newArr;
  //Convert the arguments object into an array
  var args = Array.prototype.slice.call(arguments);
  //Use reduce function to flatten the array
  newArr = args.reduce(function(arrA, arrB) {
    //Apply filter to remove the duplicate elements in the array
    return arrA.concat(
      arrB.filter(function(i) {
        return arrA.indexOf(i) === -1;
      })
    );
  });

  return newArr;
}

// test here
uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
```

### SUPER SEXY ES2015 Solution
```js

function uniteUnique(...arrays) {
  //make an array out of the given arrays and flatten it (using the spread operator)
  const flatArray = [].concat(...arrays);

  // create a Set which clears any duplicates since it's a regular set and not a multiset
  return [...new Set(flatArray)];
}

// test here
uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
```

## [Sum All Primes](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/sum-all-primes)



A prime number is a whole number greater than 1 with exactly two divisors: 1 and itself. For example, 2 is a prime number because it is only divisible by 1 and 2. In contrast, 4 is not prime since it is divisible by 1, 2 and 4.

Rewrite `sumPrimes` so it returns the sum of all prime numbers that are less than or equal to num.

```js
const isPrime = (num) => {
  for ( let i = 2; i <= Math.sqrt(num); i++ ){
      if (num % i === 0) return false
  }
  return true;
}

function sumPrimes(num) {
  let result = 0;
  for(let i = 2; i <= num; i++){
    if (isPrime(i)) result += i;
  }
  return result;
}

const testArray = [1,2,3,8,9,10,977,1000]
testArray.forEach(test => console.log(`Sum of primes up to ${test} is: `, sumPrimes(test)));

```

## [Smallest Common Multiple](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/smallest-common-multiple)



Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

For example, if given 1 and 3, find the smallest common multiple of both 1 and 3 that is also evenly divisible by all numbers between 1 and 3. The answer here would be 6.

```js
'use strict';
const arrayMaker = (small, big) => {
  if (small === big - 1 ) return [small, big];
  return [small].concat(arrayMaker(small+1,big));
}

function smallestCommons(arr) {
  if (arr[0] === arr[1]) return "Input must be two different positive integers" 
  let fullArray = arr[0] > arr[1] ? arrayMaker(arr[1],arr[0]) : arrayMaker(arr[0],arr[1]);

  let numberOfPasses = 0;
  let result = 1;
  while ( numberOfPasses === 0){
    fullArray.forEach(value => {
      if (result % value === 0) {
        numberOfPasses++;}
    })
    if (result > 100000000) return "this has been going on a bit long now"
    if ( numberOfPasses === fullArray.length)
      return result;
    else
      numberOfPasses = 0;
      result ++;
  }

}

const testArray = [
  [1, 5], [5, 1], [2, 10], [1, 13], [23, 18], [1,1]
]
testArray.forEach(test => console.log(smallestCommons(test)));
```

## [Binary Agents](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/binary-agents)

### Good for working with ASCII and Binary

Return an English translated sentence of the passed binary string.

The binary string will be space separated.

```js
function binaryAgent(str) {
  const characterArray = str.split(" ");
  return characterArray.map(character => 
    String.fromCharCode(
      parseInt(character, 2).toString())).join('')
}

const testArray = [
  "01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111",
  "01001001 00100000 01101100 01101111 01110110 01100101 00100000 01000110 01110010 01100101 01100101 01000011 01101111 01100100 01100101 01000011 01100001 01101101 01110000 00100001"
]
testArray.forEach(test => console.log(binaryAgent(test)));
```

## [Everything Be True]()
### objects arrays truthiness Stupid Answer




Check if the predicate (second argument) is truthy on all elements of a collection (first argument).

In other words, you are given an array collection of objects. The predicate `pre` will be an object property and you need to return `true` if its value is `truthy`. Otherwise, return `false`.

In JavaScript, `truthy` values are values that translate to true when evaluated in a Boolean context.

Remember, you can access object properties through either dot notation or `[]` notation.


This MUCH better answer!
```js
function truthCheck(collection, pre) {
  return collection.every(object => object[pre])
}
```



```js
'use strict';

function truthCheck(collection, pre) {
  let allTruthy = true;
  collection.forEach(object => {
    for (let property in object){
      if (!object[pre]){
//        console.log("untruthy:\t", object);
        allTruthy = false;
      } else {
//        console.log("truthy:\t", object);
      }
    }
  })
  return (allTruthy);
}

const testArray = [
  [[{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"],
  [[{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"],
  [[{"user": "Tinky-Winky", "sex": "male", "age": 0}, {"user": "Dipsy", "sex": "male", "age": 3}, {"user": "Laa-Laa", "sex": "female", "age": 5}, {"user": "Po", "sex": "female", "age": 4}], "age"],
  [[{"name": "Pete", "onBoat": true}, {"name": "Repeat", "onBoat": true}, {"name": "FastForward", "onBoat": null}], "onBoat"],
  [[{"name": "Pete", "onBoat": true}, {"name": "Repeat", "onBoat": true, "alias": "Repete"}, {"name": "FastForward", "onBoat": true}], "onBoat"],
  [[{"single": "yes"}], "single"],
  [[{"single": ""}, {"single": "double"}], "single"],
  [[{"single": "double"}, {"single": undefined}], "single"],
  [[{"single": "double"}, {"single": NaN}], "single"]
]
testArray.forEach(test => console.log(truthCheck(test[0],test[1])));
```

# Extremely useful techniques
## [Arguments Optional](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/arguments-optional)
### see how the arguments are extracted into new variables



Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.

For example, `addTogether(2, 3)` should return `5`, and `addTogether(2)` should return a function.

Calling this returned function with a single argument will then return the sum:
``
var sumTwoAnd = addTogether(2);
``
`sumTwoAnd(3)` returns `5`.

If either argument isn't a valid number, return `undefined`.

```js
'use strict';

function addTogether() {
  const [first, second] = arguments
  if(typeof(first) !== "number")
    return undefined;
  if (second === undefined)
    return (second) => addTogether(first,second);
  if (typeof(second) !== "number")
    return undefined;
  return first + second;
}

```


## [Map the Debris]()

```js
function orbitalPeriod(arr) {
  const response = [];
  const GM = 398600.4418;
  const earthRadius = 6367.4447;

  let periodCalc = (altitude) =>  Math.round(2*Math.PI * Math.sqrt(Math.pow(altitude+earthRadius,3) / GM));

  arr.forEach(element => 
    response.push({name: element.name, orbitalPeriod: periodCalc(element.avgAlt)}));
  return response;
}

let example = orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]);

console.log(example);
```

## [Roman Numeral Converter](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/roman-numeral-converter)



Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.


```js
"use strict";

const latin=[
  ['','I','II','III','IV','V','VI','VII','VIII','IX'],
  ['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'],
  ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM'],
]

const prepareNumber = num => 
  num.toString()
  .split('')
  .map( x => parseInt(x,10))
  .reverse();

const convertToRoman = num =>
  prepareNumber(num).map( (x,i) => (i < 3) ? latin[i][x] : 'M'.repeat(x))
  .reverse()
  .join('');

const testArray = [7981,2,3,4,5,9,12,16,29,44,45,68,83,97,99,400,500,501,649,798,891,1000,1004,1006,1023,2014,3999]

testArray.forEach(test => console.log(convertToRoman(test)));
```

## [Caesars Cipher](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher)



One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

```js
"use strict";

let cipherSwap = charCode => charCode >= 65 && charCode <= 77 ? charCode + 13
  :  charCode >= 78 && charCode <= 90 ? charCode - 13
  : charCode;

function rot13(str) {
  let response = ""
  for(let i = 0; i < str.length; i++){
    response += String.fromCharCode(cipherSwap(str.charCodeAt(i)));
  }
  return response;
}

const testArray = ['SERR PBQR PNZC','SERR CVMMN!','SERR YBIR?','GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.']

testArray.forEach(test => console.log(rot13(test)));
```

## [Telephone Number Validator](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/telephone-number-validator)


Return `true` if the passed string looks like a valid US phone number.

The user may fill out the form field any way they choose as long as it has the format of a valid US number. The following are examples of valid formats for US numbers (refer to the tests below for other variants):
```
    555-555-5555
    (555)555-5555
    (555) 555-5555
    555 555 5555
    5555555555
    1 555 555 5555
```
For this challenge you will be presented with a string such as `800-692-7753` or `8oo-six427676;laskdjf`. Your job is to validate or reject the US phone number based on any combination of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone number; otherwise return false.

```js
"use strict";

const badNums = str => str.replace(/[^\d]/g, '').length < 10 ? true 
                          : str.replace(/[^\d]/g, '').length > 11 ? true
                          : str.replace(/[^\d]/g, '').length === 10 ? false
                          : str.replace(/[^\d]/g, '').charAt(0) === '1' ? false
                          : true;

const badChars = str => /([^\d\s)(-]|(^[^\d(]))/g.test(str);
const badDash = str => /-(?!\d\d\d)/g.test(str);
const badParenthesis = str => /((?<!\(\d\d\d)\))|(\((?!\d\d\d\)))/g.test(str);
function telephoneCheck(str) {
  if (badNums(str)) return false;
  if (badChars(str)) return false;
  if (badDash(str)) return false;
  if (badParenthesis(str)) return false;
  else
    return true;  
}


const testArray = [
  "555-555-5555", "1 555-555-5555", "1 (555) 555-5555", "5555555555", "555-555-5555", "(555)555-5555", "1(555)555-5555", "555-5555", "5555555", "1 555)555-5555", "1 555 555 5555", "1 456 789 4444", "123**&!!asdf#", "55555555", "(6054756961)", "2 (757) 622-7382", "0 (757) 622-7382", "-1 (757) 622-7382", "2 757 622-7382", "10 (757) 622-7382", "27576227382", "(275)76227382", "2(757)6227382", "2(757)622-7382", "555)-555-5555", "(555-555-5555", "(555)5(55?)-5555", "55 55-55-555-5" ]

testArray.forEach(test => console.log(telephoneCheck(test), `\t ${test}`));

```