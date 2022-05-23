import { useState } from "react";


//solution will be paseed to function : randomSolution 
const useWordle = (solution) => {

    //usesatate
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gussess, setGuessess] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});
    const [showModel, setShowModel] = useState(false);

    //format a guess in an array with letter objets
    //e.g [{key : 'a' , color : 'green'}]

    const formatGuess = () =>{
      //spread the solution in individual letter
      let solutinArray = [...solution]
      //spread the guess in individual letters
      let formattedGuess = [...currentGuess].map((lop) =>{
        return {key : lop, color : 'grey'}
      });

      //find letters on right place  : assign green color : l : i:
      formattedGuess.forEach((lop,i)=>{
          if(solutinArray[i] === lop.key){
            formattedGuess[i].color = 'green';
            solutinArray[i] = null;
          }
      });

      //find letter in word but not on right place : assign yellow color
      formattedGuess.forEach((lop,i)=>{
         if(solutinArray.includes(lop.key) && lop.color !== 'green'){
             formattedGuess[i].color = 'yellow'
             solutinArray[solutinArray.indexOf(lop.key)] = null;
         }
      });

      return formattedGuess;

    };//format guess ends here

    //update the state isCorrect if guess by user is correct
    // increment the turn state by 1
    // add new guess word in state

    const addNewGuess = (formattedGuess) => {

      //if guess is ture to solution
      if(currentGuess === solution){
        setIsCorrect(true)
      }

      //
      setGuessess((prevGuesses)=>{
         let newGuesses = [...prevGuesses]
         newGuesses[turn] = formattedGuess
         return newGuesses
      });

      //
      setHistory((prevHistory)=>{
        return [...prevHistory, currentGuess]
      });

      //

      setTurn((prevTurn)=>{
      return prevTurn + 1
      });

      //
      setUsedKeys(prevUsedKeys => {
        formattedGuess.forEach(l => {
          const currentColor = prevUsedKeys[l.key]
  
          if (l.color === 'green') {
            prevUsedKeys[l.key] = 'green'
            return
          }
          if (l.color === 'yellow' && currentColor !== 'green') {
            prevUsedKeys[l.key] = 'yellow'
            return
          }
          if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
            prevUsedKeys[l.key] = 'grey'
            return
          }
        })
  
        return prevUsedKeys
      });

      setCurrentGuess('')
        
    };

    //handle the key events, and track current guess
    //add new guess when user press enter

    const handleKeyup = ({key}) =>{
      // console.log(key);

      //cheking for Enter
      if(key ==='Enter'){
        //if turn value is less than 5
        if(turn > 5){
          console.log('all turns are used');
          return
        }
        // no duplicate word is present in history
        if(history.includes(currentGuess)){
          console.log('word is allready used');
          return
        }
        // word is 5 letter long
        if(currentGuess.length !== 5){
          console.log('word must contain 5 letter')
          return
        }
        
        //
         let formatted =  formatGuess();
         addNewGuess(formatted);
      
        
      }

      //checking for Backspace and delete last entered letter
      if(key === 'Backspace'){
        setCurrentGuess((prev)=>{
         return prev.slice(0 , -1);
        });
      }
     
      // checking for alphabets
      if (/^[A-Za-z]$/.test(key)){
        if(currentGuess.length < 5){
          setCurrentGuess((prev) =>{
           return prev+key;
          });
        }
      }
    };

    //return 

    return {
        turn,
        gussess,
        isCorrect,
        currentGuess,
        handleKeyup,
        usedKeys,
        showModel,
        setShowModel
    }

}

export default useWordle;