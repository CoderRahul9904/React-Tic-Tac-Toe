import { useState } from "react"
import Player from "./components/player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import Log from "./components/Log.jsx"
import { WINNING_COMBINATIONS } from "../App.js"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function SayActivePlayer(CurrTurn) {
  let currSymbol = 'X'
  if (CurrTurn.length > 0 && CurrTurn[0].Player === 'X') {
    currSymbol = '0'
  }
  return currSymbol
}

function App() {
  const [CurrTurn, PrevTurn] = useState([])
  const ActivePlayer = SayActivePlayer(CurrTurn)

  const gameBoard = initialGameBoard;
  for (const turn of CurrTurn) {
    const { square, Player } = turn
    const { row, col } = square
    gameBoard[row][col] = Player
  }

  function handlePlayer(colIndex, rowIndex) {
    PrevTurn((setGameTurn) => {
      let currSymbol = 'X'
      if (setGameTurn.length > 0 && setGameTurn[0].Player === 'X') {
        currSymbol = '0'
      }
      const updateTurns = [{ square: { col: colIndex, row: rowIndex }, Player: currSymbol }, ...setGameTurn]
      return updateTurns
    }
    )
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player Name="Player 1" Symbol="X" isActive={ActivePlayer == 'X'} />
          <Player Name="Player 2" Symbol="0" isActive={ActivePlayer == '0'} />
        </ol>
        <GameBoard onSelectBox={handlePlayer} board={gameBoard} />
      </div>
      <Log turns={CurrTurn} />
    </main>
  )
}

export default App
