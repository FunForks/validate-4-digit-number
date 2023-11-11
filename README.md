# Validating a string of 4 unique digits with RegExp

> Before running `node index.js`, you will need to run `npm i`
> to install the `prompt-sync` module, which is used to interact
> with the user through the Terminal.

When playing a game of Bulls and Cows, the user is asked to enter a string of 4 unique digits. The aim is to guess which 4 digits the other player (computer) has secretly selected.
For example:

- `abcd` would **not** be an acceptable because it contains characters other than number
- `1112` would **not** be an acceptable because it contains the same digit more than once
- `1234` on the other hand is an acceptable value for the secret number, since each digit is unique

The `index.js` script in this repository shows you how to use Regular Expressions to check if input from the Terminal window is a string of 4 unique digits.

Here's the validation code:

```javascript
const is4DigitString = /^\d{4}$/
const containsDupe = /(?<dupe>.).*\k<dupe>/

const validateInput = string => {
  return is4DigitString.test(string) && !containsDupe.test(string)
}
```

See `index.js` for explanations on how these Regular Expressions work.

**NOTE: Regular Expressions are *not* the fastest way to solve this particular issue. See the `everyCharIsUnique()` function, which uses the [every() Array method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) to detect duplicate characters. It works about 30% faster than a Regular Expression (but it takes more lines of code).**
