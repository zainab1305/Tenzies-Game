import Die from "./Die"
import React from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
function Main()
{
    const [generateNewDice,setGenerateNewDice]=React.useState(() => generateAllNewDice())
    const gameWon = generateNewDice.every(die => die.isHeld) && 
        generateNewDice.every(die => die.value === generateNewDice[0].value)
    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() =>({ value:Math.ceil(Math.random() * 6),
              isHeld:false,
            id:nanoid()}))
        }
    function Hold(id)
    {
      setGenerateNewDice(prev => (prev.map(x => 
      {
       return x.id === id ? {...x, isHeld:!x.isHeld} : x
      }
      )))
    }
    const dices=generateNewDice.map((die) => <Die key={die.id} value={die.value} held={die.isHeld} hold={Hold} id={die.id}></Die>)
    function newDice()
    {
      gameWon? setGenerateNewDice(generateAllNewDice) :setGenerateNewDice(prev => prev.map((x)=>{
         return x.isHeld ? x : {...x,value: Math.ceil(Math.random() * 6)}
      }))
    }
    return (
            <div className="box">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice">
            {dices}
            </div>
            <button onClick={newDice} className="re-roll">{gameWon?"New Game":"Roll"}</button>
            {gameWon && <Confetti  />}
            </div>
       
    )
}
export default Main