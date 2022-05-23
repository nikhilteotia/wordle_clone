//entire ui of the game will be here : with some nested components : short => rfc 


import { useEffect } from 'react';
import wordleHook from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad';
import Model from './Model'
export default function Wordle({ solution }) {

    const {currentGuess, handleKeyup, isCorrect, gussess, turn, usedKeys, showModel, setShowModel} = wordleHook(solution);

    //adding event listner
    useEffect( () => {
       window.addEventListener('keyup', handleKeyup);

       if(isCorrect){
        setTimeout(() => setShowModel(true), 2000);
        window.removeEventListener('keyup', handleKeyup);
        }

        if(turn > 5){
          setTimeout(() => setShowModel(true), 2000);
          window.removeEventListener('keyup', handleKeyup);
        }

       return () => window.removeEventListener('keyup', handleKeyup);
    } , [handleKeyup, isCorrect]);

    // useEffect(() => {
    //      console.log('g :',gussess)
    //      console.log('t : ', turn)
    //      console.log('r :', isCorrect)
    // },[gussess,turn,isCorrect]);

    

  return (
    <div>
      {/* <div>Solution word : {solution}</div>
      <div>current guess : {currentGuess}</div> */}
      
      {/* pass currentGuess, gussess, and turn as props to Grid component */}
      <Grid currentGuess={currentGuess} guesses={gussess} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModel && <Model isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </div>
    
  )
}
 