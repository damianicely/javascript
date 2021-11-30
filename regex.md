# Regex

This is such a nightmare thing to remember. Immediately below are some useful links and usage examples. Below that are a bunch of tricky problems.

[Regex Match Everything After a Specific Character](https://regexland.com/regex-match-after-character/)

## [How to match "anything up until this sequence of characters" in a regular expression?](https://stackoverflow.com/questions/7124778/how-to-match-anything-up-until-this-sequence-of-characters-in-a-regular-expres)

```js
/.+?(?=abc)/
```

The `.+?` part is the **un-greedy** version of `.+` (**one or more of anything**). When we use `.+`, the engine will basically match everything. Then, if there is something else in the regex it will go back in steps trying to match the following part. This is the **greedy** behavior, meaning **as much as possible to satisfy**.

When using `.+?`, instead of matching all at once and going back for other conditions (if any), the engine will match the next characters by step until the subsequent part of the regex is matched (again if any). This is the **un-greedy**, meaning match the **fewest possible to satisfy**.
```
/.+X/  ~ "abcXabcXabcX"        /.+/  ~ "abcXabcXabcX"
          ^^^^^^^^^^^^                  ^^^^^^^^^^^^

/.+?X/ ~ "abcXabcXabcX"        /.+?/ ~ "abcXabcXabcX"
          ^^^^                          ^
```
Following that we have `(?={contents})`, a *zero width assertion, a look around*. This grouped construction matches its contents, but does not count as characters matched (**zero width**). It only returns if it is a match or not (**assertion**).

Thus, in other terms the regex `/.+?(?=abc)/` means:

    Match any characters as few as possible until a "abc" is found, without counting the "abc".



/**
 * Algorithmic solutions to capitalising first letter of each word in a string
 * The Regex replace function is particularly interesting*/

/*let originalString = "This is my string. It's a good string";
const newArray = str.split(" ");
for(let i = 0; i < newArray.length; i++){
    newArray[i] = newArray[i].slice(0, 1).toUpperCase()+newArray[i].slice(1, newArray[i].length).toLowerCase();
}
return newArray.join(" ");
console.log(result);
*/


function titleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g,L => L.toUpperCase());
  }
  
  
  console.log(titleCase("I'm a little tea pot"));
  
  ## [Convert HTML Entities](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/convert-html-entities)
  Convert the characters `&`, `<`, `>`, `"` (double quote), and `'` (apostrophe), in a string to their corresponding HTML entities.

```js
"use strict";
let lookUpTable = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "\'": "&apos;"
}
function convertHTML(str) {
  return str.replace(/[&<>'"]/g, (str) => lookUpTable[str]);
}
const testArray = ["Dolce & Gabbana","Hamburgers < Pizza < Tacos","Sixty > twelve","Stuff in \"quotation marks\"","Schindler's List","<>","abc"];
testArray.forEach(test => console.log(convertHTML(test)));
```
  ## Use split with regex:

  ```
  function splitify(str) {
  // Only change code below this line
  return str.split(/\W/g);
  

  // Only change code above this line
}


console.log(splitify("Hello World,I-am code"))
```

## Use split then join to make various sentences from strings with regex

```
function sentensify(str) {
  // Only change code below this line
  return str.split(/\W/g).join(" ");

  // Only change code above this line
}

sentensify("May-the-force-be-with-you");
sentensify("The.force.is.strong.with.this.one");
sentensify("There,has,been,an,awakening");

```

## trim then split then filter then join

```
function urlSlug(title) {
  return title
            .trim()
            .split(/\s+/g)
            .join("-")
            .toLowerCase()
}
console.log(
    urlSlug(" Winter Is  Coming")),
    urlSlug("A Mind Needs Books Like A Sword Needs A Whetstone"),
    urlSlug("Hold The Door"));
```
Or alternatively
```
function urlSlug(title) {
  return title
    .split(" ")
    .filter(word => word != "")
    .join("-")
    .toLowerCase();
}
```
## Camelcase spaces or underscores to spinal-case
Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.
```js
function spinalCase(str) {
  return str
  .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
   .split(/[^A-Za-z0-9]/g)
  .join("-")
  .toLowerCase();
}

console.log(spinalCase('This Is Spinal Tap'));

/* "This Is Spinal Tap": this-is-spinal-tap.
"thisIsSpinalTap": this-is-spinal-tap.
"The_Andy_Griffith_Show": the-andy-griffith-show.
"Teletubbies say Eh-oh": teletubbies-say-eh-oh.
"AllThe-small Things": all-the-small-things. */
```

## [Pig Latin](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/pig-latin)

Pig Latin is a way of altering English Words. The rules are as follows:

- If a word begins with a consonant, take the first consonant or consonant cluster, move it to the end of the word, and add ay to it.

- If a word begins with a vowel, just add way at the end.

```js
"use strict";
function translatePigLatin(str) {
  if(!/[aeiouy]/.test(str) || /^[aeiouy]/.test(str))
    return str+"ay";
  else
    return str.replace(/([bcdfghjklmnpqrstvwxz]+)([aeiouy].*)/, '$2$1'+"ay");
}
                   
const testArray = ["california", "paragraphs", "glove", "algorithm", "eight", "schwartz", "rhythm"]
testArray.forEach(test => console.log(translatePigLatin(test)));
```

## [Search and Replace](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/search-and-replace)

Perform a search and replace on the sentence using the arguments provided and return the new sentence.

First argument is the sentence to perform the search and replace on.

Second argument is the word that you will be replacing (before).

Third argument is what you will be replacing the second argument with (after).

Note: Preserve the case of the first character in the original word when you are replacing it. For example if you mean to replace the word Book with the word dog, it should be replaced as Dog
\\

```js
"use strict";
function myReplace(str, before, after) {

  let isFirstUpper = ( word ) => /^[A-Z]/.test(word);
  let makeFirstUpper = ( word2 ) => {
    return word2.slice(0,1).toUpperCase() + word2.slice(1);
  }
  return isFirstUpper(before) === isFirstUpper(after) ? str.replace(before, after)
    : isFirstUpper(before) ? str.replace(before, makeFirstUpper(after))
    : str.replace(before, after.toLowerCase());
}
                    
const testArray =
  [
    ["Let us go to the store", "store", "mall"],
    ["He is Sleeping on the couch", "Sleeping", "sitting"],
    ["I think we should look up there", "up", "Down"],
    ["This has a spellngi error", "spellngi", "spelling"],
    ["His name is Tom", "Tom", "john"],
    ["Let us get back to more Coding", "Coding", "algorithms"]
  ]
testArray.forEach(test => console.log(
    myReplace(test[0], test[1], test[2])
  ));
```

## [Palindrome Checker](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/palindrome-checker)

### Regex replacement followed by string reversal

Return `true` if the given string is a palindrome. Otherwise, return `false`.

A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

Note: You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.

We'll pass strings with varying formats, such as `racecar`, `RaceCar`, and `race CAR` among others.

We'll also pass strings with special symbols, such as `2A3*3a2`, `2A3 3a2`, and `2_A3*3#A2`.


```js
"use strict";

let txtClean = str => str.replace(/(\W|_)/g, '').toLowerCase();

let txtRev = str => str.split('').reverse().join('');

let palindrome = str => txtClean(str) === txtRev(textCleaner(str)) ? true: false;

const testArray = ["eye", "_eye", "race car", "not a palindrome", "A man, a plan, a canal. Panama", "never odd or even", "nope","almostomla","My age is 0, 0 si ega ym.", "1 eye for of 1 eye.","0_0 (: /-\ :) 0-0","five|\_/|four"]
testArray.forEach(test => console.log(palindrome(test)));
```