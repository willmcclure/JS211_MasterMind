'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}
  
//     Spec 2.4 - return hint string: Optionally, you can use the colors package, 
        // return a string that prints out the hints you generated, with correctLetterLocations being red, 
        // correctLetters being white, and separated by a hyphen. 
        // (NOTE If you choose to use this color package, only console.log the result. 
        // If you return the result your program will fail the tests.)


// Spec 2 - Generate a hint: generateHint() should take one argument, guess.
const generateHint = (guess) =>  {
  
  // Create a variable correctLetterLocations and set it to 0
  let correctLetterLocations = 0;
  // Set a variable correctLetters equal to 0 
  let correctLetters = 0;

  // Spec 2.1 - Split up the solution and guess: In generateHint(), create variables solutionArray and guessArray 
  // that each split up passed in arguments, .splitting on '' (empty string).
  
  let guessArray = guess.split(" ");
  let solutionArray = solution.split(" ");
  
  // In a for loop, iterate over the solutionArray, comparing each index of solutionArray against the same index of guessArray. 
  // If the item matches, increment correctLetterLocations, and set that index in solutionArray to null.
  for(let i = 0; i < solutionArray.length; i++){
    if(solutionArray[i] == guessArray[i]){
      correctLetterLocations = correctLetterLocations + 1;
      solutionArray[i] = null;
    }
  };

  //Spec 2.3 - Determine correct "letters": Now that we have nulled the already counted correctLetterLocations, // and in a for loop, again iterate over the solutionArray.
    // we can see if the guessArray contains any correctLetters that were not in the correct location. 
    // Save that index in a variable called targetIndex. 
    // Now, if targetIndex is greater than -1, increment correctLetters and set the item in solutionArray at that index equal to null.
    // Using .indexOf, determine if the item at the current index in guessArray appears inside of solutionArray.
  for(let i = 0; i < solutionArray.length; i++){
    let targetIndex = solutionArray.indexOf(guessArray[i]);
    if(targetIndex > -1){
      correctLetterLocations = correctLetterLocations + 1;
      solutionArray[targetIndex] = null;
    }
  }
  let userhint = correctLetterLocations.toString() + "-" + correctLetters.toString();
  return userhint
};

// Spec 1 - Detect a correct solution: In mastermind(), if the guess you passed in equals the solution, 
// return 'You guessed it!';

const mastermind = (guess) => {
  solution = 'abcd'; // Comment this out to generate a random solution
  if(board.length == 10) {
    return `You ran out of guesses. The solution was`, + solution
  } else {
        if(guess == solution){
          console.log('You guessed it!');
          return 'You guessed it!';
        } else {
          board.push(guess + ' hint is' + generateHint(guess))
          console.log("Guess Again Please")
        }
  }
}

const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}