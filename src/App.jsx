import { useState } from "react"
import Player from "./components/player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import Log from "./components/Log.jsx"
import { WINNING_COMBINATIONS } from "../App.js"
import GameOver from "./components/GameOver.jsx"

const PLAYERS={
  X:'Player 1',
  0: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function DeriveGameBoard(CurrTurn){
  const gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];
  for (const turn of CurrTurn) {
    const { square, Player } = turn
    const { row, col } = square
    gameBoard[row][col] = Player
  }
  return gameBoard
}

function DeriveWinner(gameBoard ,PlayerName){
  let Winner;

  for( const combination of WINNING_COMBINATIONS){
    const FirstsquareSymbol=gameBoard[combination[0].row][combination[0].column]
    const SecondsquareSymbol=gameBoard[combination[1].row][combination[1].column]
    const ThirdsquareSymbol=gameBoard[combination[2].row][combination[2].column]

    if(FirstsquareSymbol && FirstsquareSymbol===SecondsquareSymbol && FirstsquareSymbol===ThirdsquareSymbol){
      Winner=PlayerName[FirstsquareSymbol];
    }
  }
  return Winner
}

function SayActivePlayer(CurrTurn) {
  let currSymbol = 'X'
  if (CurrTurn.length > 0 && CurrTurn[0].Player === 'X') {
    currSymbol = '0'
  }
  return currSymbol
}

function App() {
  const [CurrTurn, PrevTurn] = useState([])
  const [PlayerName, SetPlayerName]=useState({
    X:'Player 1',
    0:'Player 2'
  })
  const ActivePlayer = SayActivePlayer(CurrTurn)
  const gameBoard=DeriveGameBoard(CurrTurn)
  const Winner=DeriveWinner(gameBoard, PlayerName)
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

  function onPlayerName(symbol,NewName){
    SetPlayerName(prevPlayerName => {
      return {
        ...prevPlayerName,
        [symbol] : NewName
      }
    }
      )
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player Name="Player 1" Symbol="X" isActive={ActivePlayer == 'X'} onChangeName={onPlayerName}/>
          <Player Name="Player 2" Symbol="0" isActive={ActivePlayer == '0'} />
        </ol>
        {(Winner || isDraw) && <GameOver winner={Winner} onRestart={RestartMatch}  onChangeName={onPlayerName}/>}
        <GameBoard onSelectBox={handlePlayer} board={gameBoard} />
      </div>
      <Log turns={CurrTurn} />
    </main>
  )
}

export default App
