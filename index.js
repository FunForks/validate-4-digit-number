/** 
 * Validate input for Bulls and Cows with Regular Expressions
 */


// Get library for user input
// we need to keep the next line, so we can prompt the user for input
const prompt = require('prompt-sync')({ sigint: true });

// Regular expressions for testing if a string contains exactly
// 4 unique digits

// Exactly 4 digits
const is4DigitString = /^\d{4}$/
// ^   asserts position at start of a line
// \d  matches a digit (equivalent to [0-9])
// {4} matches the digit token exactly 4 times
// $   asserts position at the end of a line


// All characters are different: version 1
const duplicateAhead = /(.).*(?=\1)/
// (.)    Captures a character
// .*     Allows this character to be followed by
//        zero or more different characters
// (?=\1) Lookahead to match the captured character

// All characters are different: version 2
const containsDupe = /(?<dupe>.).*\k<dupe>/
// (?<dupe> ) Creates a named capturing group
// (?<dupe>.) Captures any character in the group named "dupe"
// .*         Allows this character to be followed by
//            zero or more different characters
// \k<dupe>   Matches the string captured in the group named "dupe"


// Splitting the string, and checking if each char appears only
// once. Note: Array.prototype.every() stops iterating through the
// array as soon as a falsy value is returned.
const everyCharIsUnique = string => (
  [...string].every(( char, index, array ) => (
    // `index` will indicate where this occurrence of `char`
    // appears in `array`. `array.indexOf(char)` checks where
    // the first occurrence of `char` appears. If the values are
    // no the same, this is the second occurrence of`char`
    array.indexOf(char) === index)
  )
)


// Testing the Regular Expressions
;(function test(){
  console.log("Regular Expressions used to find duplicates")
  console.log("(See index.js for explanations)")
  console.log("———————————————————————————————————————————")

  console.log("duplicateAhead:", duplicateAhead);
  console.log("containsDupe:  ", containsDupe);
  
  console.log("\nTesting that both Regular Expressions find duplicates")
  console.log("\Also testing a non-RegExp solution: everyCharIsUnique")
  console.log("—————————————————————————————————————————————————————")
  const strings = {
      "1234": false,
      "1231": true,
      "1214": true,
      "1134": true,
      "1224": true,
      "1232": true,
      "1233": true,
      "abba": true,
      "abcd": false
  }
  const entries = Object.entries(strings)
  // Check each Regular Expression only once
  entries.forEach(( [ string, expected ]) => {
    const foundAhead = duplicateAhead.test(string)
    const foundDuplicate = containsDupe.test(string)
    const notUnique = !everyCharIsUnique(string)

    const pass = foundAhead === expected
              && foundDuplicate === expected
              && notUnique === expected
    
    console.log(`string: ${string}, duplicateAhead: ${foundAhead}, ${foundAhead ? " " : ""}containsDupe: ${foundDuplicate}, ${foundDuplicate ? " " : ""}!everyCharIsUnique: ${notUnique}, ${notUnique ? " " : ""}Tests pass: ${pass}`);
  })

  const times = 1000000

  console.log("\nTesting 1 million positive and negative results")
  console.log("———————————————————————————————————————————————")
 
  const t0 = performance.now();
  for ( let ii = 0; ii < times; ii += 1 ) {
    duplicateAhead.test("no duplicate")
    duplicateAhead.test("repeated eee")
  }
  const t1 = (performance.now() - t0).toFixed(3)
  console.log(`duplicateAhead    took ${t1} ms`);

  const t2 = performance.now();
  for ( let ii = 0; ii < times; ii += 1 ) {
    containsDupe.test("no duplicate")
    containsDupe.test("repeated eee")
  }
  const t3 = (performance.now() - t2).toFixed(3)
  console.log(`containsDupe      took ${t3} ms`);

  const t4 = performance.now();
  for ( let ii = 0; ii < times; ii += 1 ) {
    everyCharIsUnique("no duplicate")
    everyCharIsUnique("repeated eee")
  }
  const t5 = (performance.now() - t4).toFixed(3)
  console.log(`everyCharIsUnique took ${t5} ms\n`);

  const regExpTime = Math.min(t1, t3)
  if (regExpTime < t5) {
    const percent = (100 - (regExpTime * 100 / t5)).toFixed(0)
    console.log(`Regular Expression is ${percent}% faster`);
  } else {
    const percent = (100 - (t5 * 100 / regExpTime)).toFixed(0)
    console.log(`everyCharIsUnique() is ${percent}% faster than Regular Expressions`);
  }
})()

const validateInput = string => {
  return is4DigitString.test(string) && !containsDupe.test(string)
  // // OR
  // return is4DigitString.test(string) && !duplicateAhead.test(string)
}

console.log("\nYou can test any input string manually")
console.log("To stop testing, press ENTER")
console.log("———————————————————————————————————————")
let guess
do {
  guess = prompt("Enter a 4-digit number. All digits must be unique > ")
  if (guess) {
    const result = validateInput(guess)
    const message = result
      ? "valid"
      : "not a number with 4 unique digits"
    console.log(`${guess} is ${message}
    `);
  }
} while (guess)
