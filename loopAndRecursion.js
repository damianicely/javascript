function rangeOfNumbers(startNum, endNum) {
    if (startNum == endNum){
        return [startNum];
    } else {
        const rangeArray = rangeOfNumbers(startNum+1, endNum);
        rangeArray.unshift(startNum);
        return rangeArray;
    }
  };
  console.log(rangeOfNumbers(4, 4));
  console.log(rangeOfNumbers(-1, 4));
  /**
Your function should return an array.

Passed

Your code should not use any loop syntax (for or while or higher order functions such as forEach, map, filter, or reduce).
Passed

rangeOfNumbers should use recursion (call itself) to solve this challenge.
Passed

rangeOfNumbers(1, 5) should return [1, 2, 3, 4, 5].
Passed

rangeOfNumbers(6, 9) should return [6, 7, 8, 9].
Passed

rangeOfNumbers(4, 4) should return [4].
   */
