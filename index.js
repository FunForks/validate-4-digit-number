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


// Testing the Regular Expressions
;(function test(){
  console.log("Regular Expressions used to find duplicates")
  console.log("(See index.js for explanations)")
  console.log("———————————————————————————————————————————")

  console.log("duplicateAhead:", duplicateAhead);
  console.log("containsDupe:  ", containsDupe);
  
  console.log("\nTesting that both Regular Expressions find duplicates")
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

    const pass = foundAhead === expected
              && foundDuplicate === expected
    
    console.log(`string: ${string}, duplicateAhead: ${foundAhead}, ${foundAhead ? " " : ""}containsDupe: ${foundDuplicate}, ${foundDuplicate ? " " : ""}Tests pass: ${pass}`);
  })

  const times = 1000000

  console.log("\nTesting 1 million positive and negative results")
  console.log("———————————————————————————————————————————————")
 

  const t0 = performance.now();
  for ( let ii = 0; ii < times; ii += 1 ) {
    duplicateAhead.test("no duplicate")
    duplicateAhead.test("repeated eee")
  }
  const t1 = performance.now();
  console.log(`duplicateAhead took ${t1 -t0} ms`);

  const t2 = performance.now();
  for ( let ii = 0; ii < times; ii += 1 ) {
    containsDupe.test("no duplicate")
    containsDupe.test("repeated eee")
  }
  const t3 = performance.now();
  console.log(`containsDupe   took ${t3 -t2} ms`);
  

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