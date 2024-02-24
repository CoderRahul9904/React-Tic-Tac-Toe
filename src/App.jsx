import { useState } from "react"
import Player from "./components/player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import Log from "./components/Log.jsx"
import { WINNING_COMBINATIONS } from "../App.js"
import GameOver from "./components/GameOver.jsx"

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

  const gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];
  for (const turn of CurrTurn) {
    const { square, Player } = turn
    const { row, col } = square
    gameBoard[row][col] = Player
  }

  let Winner;

  for( const combination of WINNING_COMBINATIONS){
    const FirstsquareSymbol=gameBoard[combination[0].row][combination[0].column]
    const SecondsquareSymbol=gameBoard[combination[1].row][combination[1].column]
    const ThirdsquareSymbol=gameBoard[combination[2].row][combination[2].column]

    if(FirstsquareSymbol && FirstsquareSymbol===SecondsquareSymbol && FirstsquareSymbol===ThirdsquareSymbol){
      Winner=FirstsquareSymbol;
    }
  }

  const isDraw= CurrTurn.length===9 && !Winner;

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

  function RestartMatch(){
    PrevTurn([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player Name="Player 1" Symbol="X" isActive={ActivePlayer == 'X'} />
          <Player Name="Player 2" Symbol="0" isActive={ActivePlayer == '0'} />
        </ol>
        {(Winner || isDraw) && <GameOver winner={Winner} onRestart={RestartMatch}/>}
        <GameBoard onSelectBox={handlePlayer} board={gameBoard} />
      </div>
      <Log turns={CurrTurn} />
    </main>
  )
}

export default App
