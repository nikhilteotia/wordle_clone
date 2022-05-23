import React from 'react'

export default function Modal({ isCorrect, solution, turn }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">Wordle Word is : {solution}</p>
          <p>You found the solution in {turn} guesses :)</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>You Lose!</h1>
          <p className="solution">Wordle Word is : {solution}</p>
          <p>Better luck next time :)</p>
        </div>
      )} 
    </div>
  )
}