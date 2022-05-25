import React, { useEffect, useState } from 'react'

export default function Keypad({ usedKeys, setShowModel, setTimeout, handleKeyup,isCorrect, turn}) {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    fetch('https://nikhil-wordle-clone-api.herokuapp.com/bommer')
      .then(res => res.json())
      .then(json => {
        setLetters(json)
      })
  }, [])

  //adding event listner
  useEffect( () => {
    window.addEventListener('click', handleKeyup);
   
    
    if(isCorrect){
     setTimeout(() => setShowModel(true), 2000);
     window.removeEventListener('click', handleKeyup);
     
     }

     if(turn > 5){
       setTimeout(() => setShowModel(true), 2000);
       window.removeEventListener('click', handleKeyup);
       
     }

    return () => {
     window.removeEventListener('click', handleKeyup);
     
    }
 } , [handleKeyup, isCorrect]);


  return (
    <div className="keypad">
      {letters && letters.map(l => {
        const color = usedKeys[l.key]
        
        return (
          <div key={l.key} className={color}>{l.key}</div>
        )
      })}
    </div>
  )
}