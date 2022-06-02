# <p align="center"><img src="https://user-images.githubusercontent.com/42378704/171689787-da0b45e2-f0a2-4512-9439-9d5f83453f75.png" alt="Logo" width="128" align="center"/> <br/>![GitHub issues](https://img.shields.io/github/issues/4techguns/thirtydollar.js)  ![npm](https://img.shields.io/npm/dt/thirtydollar.js)<br/> DON'T YOU LECTURE ME WITH YOUR THIRTY DOLLAR LIBRARY</p>
DON'T YOU LECTURE ME WITH YOUR THIRTY DOLLAR JAVASCRIPT LIBRARY aka thirtydollar.js, is a JavaScript/TypeScript library that helps construct and parse 🗿 files, or better known as [Thirty Dollar Website](https://thirtydollar.website) sequencer files.

## Installation
### npm
Type `npm install thirtydollar.js` into the console.
### yarn
Type `yarn install thirtydollar.js` into the console.

## Usage
This goes over basically every function in the library to get familiar with the library
```js
const { Sequence } = require("thirtydollar.js")

let seq = new Sequence([]) // this creates a sequence with an empty array of sounds/control items that we can fill up later

// utility functions are present in the Sequence to help do common things with less code
seq.setTempo(1000) // same as seq.sounds.push({ type: "!speed", pitch: 1000 })

seq.pauseFor(10, "individualUnits") // add 10 pauses to the sequence
// you can also do seq.pauseFor(10, "stopBlock") if you prefer pausing all in one item

// there are two ways to add items to a sequence, either by a utility function or adding to the array directly
seq.addItem("boom", 5) // more concise way
seq.sounds.push({ type: "boom", pitch: 5 }) // bulkier but more control over the array

console.log(seq.parseToString())
```

Conversion from an already "compiled" sequence:
```js
const { Sequence } = require("thirtydollar.js")
const { readFileSync } = require("fs")

const sequence = "boom@0|boom@0|boom@0|boom@0|boom@0|boom@0|boom@0|boom@0|boom@0|boom@0"
let seq = Sequence.parseFromString(sequence);

// do stuff to the sequence
```
