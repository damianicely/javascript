# My stupid answers

##

My stupid answer splits the alphabet and the word into two different arrays trims the to the correct sizes and compares them
```js
"use strict";
function fearNotLetter(str) {
  let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  let startIndex = alphabet.indexOf(str[0]);
  let endIndex = alphabet.indexOf(str[str.length-1]);

  let returnLetter = undefined

  alphabet.slice(startIndex,endIndex+1)
  .forEach(letter => {
    if (str.split("").indexOf(letter) == -1){
      returnLetter = letter;
    }
  })
  return returnLetter
}

const testArray = ["abce","abcdefghjklmno","stvwx","bcdf", "abcdefghijklmnopqrstuvwxyz"]
testArray.forEach(test => console.log(fearNotLetter(test)));
```


The simple solution Uses .charCodeAt()
```js
function fearNotLetter(str) {
  for (var i = 0; i < str.length; i++) {
    /* code of current character */
    var code = str.charCodeAt(i);

    /* if code of current character is not equal to first character + no of iteration
        hence character has been escaped */
    if (code !== str.charCodeAt(0) + i) {
      /* if current character has escaped one character find previous char and return */
      return String.fromCharCode(code - 1);
    }
  }
  return undefined;
}
```

## [Sum All Odd Fibonacci Numbers](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/sum-all-odd-fibonacci-numbers)

My Original Solution:

```js
let fibonnaciGenerator = (num) => {
  if (num === 1)
    return [0,1];
  const fibSeq = [0,1];
  for(let last = fibSeq[fibSeq.length-1]; num >= last; last +=fibSeq[fibSeq.length-2]){
    fibSeq.push(last)
  }
  return fibSeq;
}

function sumFibs(num) {
  let reducer = (previousValue, currentValue) => {
    return (currentValue % 2 === 0) ? previousValue : previousValue + currentValue;
  }
  return fibonnaciGenerator(num).reduce(reducer)
}

const testArray = [1,1000,4000000,4,75024,75025]
testArray.forEach(test => console.log(sumFibs(test)));
```
A More Sensible Approach
```js

function sumFibs(num) {
  let previousNumber = 0;
  let currentNumber = 1;
  let result = 0;

  while (num >= currentNumber){
    if (currentNumber % 2 !== 0)
      result += currentNumber;
    currentNumber += previousNumber;
    previousNumber = currentNumber - previousNumber;
  }
  return result;
}
```