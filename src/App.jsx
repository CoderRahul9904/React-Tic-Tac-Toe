import { useState } from "react"
import Player from "./components/player.jsx"
import GameBoard from "./components/GameBoard.jsx"
function App() {
  const [ActivePlayer,setActivePlayer]=useState('X')
  function handlePlayerHover(){
    setActivePlayer((currActivePlayer) => currActivePlayer ==='X' ? '0' : 'X')
  }
  return (
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player Name="Player 1" Symbol="X" isActive={ActivePlayer=='X'}/>
        <Player Name="Player 2" Symbol="0" isActive={ActivePlayer=='0'}/>
      </ol>
      <GameBoard onSelectBox={handlePlayerHover} playerSymbol={ActivePlayer}/>
    </div>
  )
}

export default App
