# Scoping
## A COllection of interesting examples of scoping
Block 1:
```js
let printNumTwo;
for (let i = 0; i < 3; i++){
  if (i === 2) {
    printNumTwo = function() {
      return i;
    };
  }
}
console.log(printNumTwo()); // 2
```
Block 2:
```js
let printNumTwo;
for (var i = 0; i < 3; i++) {
  if (i === 2) {
    printNumTwo = function() {
      return i;
    };
  }
}
console.log(printNumTwo()); // 3
```