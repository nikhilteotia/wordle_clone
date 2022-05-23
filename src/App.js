import { useEffect, useState,  } from "react";
import Wordle from "./components/Wordle.js";

function App() {

  //get the data from json server
  const [solution, setSolution] = useState(null);
 
  useEffect( ()=> {
    fetch('http://localhost:3001/solutions')
    .then(res => res.json())
    .then(json => {
      //random word  : var : 0-19 range
      const randomNum = Math.floor(Math.random()*json.length)
      const randomSolution = json[randomNum];

      //setting random word with setSolution : note also pass setSolution to dependency array
      setSolution(randomSolution.word);
    })
  } ,//dependency array 
     [setSolution] );
  
  return (
    <div className="App">
      <h1>Wordle</h1>
      {/* wordle component will only word id solution : true .. also passing solution to an prop called solution */}
      { solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App

/* 

data we need to track:
  -- solution
    -- 5 letter string, e.g. 'drain'
    -- use : this : https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt : done
    -- create json data : done
  -- past guesses
    -- an array of past guesses
    -- each past guess is an array of letter objects [{}, {}, {}, {}, {}] : no of array 5:
    -- each object represents a letter in the guess word {letter: 'a', color: 'yellow'} : letter : with error color
  -- current guess
    -- string 'hello'
  -- keypad letters
    -- array of letter objects [{key: 'a', color: 'green'}, {}, {} ...]
  -- number of turns
    -- an integer 0 - 6

game process:
  -- entering words:
    -- user enters a letter & a square is filled with that letter
    -- when a user hits delete it deletes the previous letter
    -- when a user hits enter it submits the word
      -- if all squares are not filled with letters then the word is not submitted
      -- if that word has already been used in a prev guess then the word is not submitted
  -- checking submitted words:
    -- each letter is checked to see if it matches to the solution
    -- each letter is assigned a color based on it's inclusion in the solution
      -- exact matches (correct position in the solution) are green
      -- partial matches (in the solution but not the correct position) are yellow
      -- none-matches (not in the solution at all) are grey
    -- the guess is added the grid with the correct colors
    -- the current guess moves to the next row
    -- the keypad letters are updated (colors)
  -- ending the game:
    -- when the guessed word fully matches the solution
      -- modal to say 'well done'
    -- when the user runs out of guesses
      -- modal to say 'unlucky'

*/