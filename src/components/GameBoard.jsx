import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({onSelectBox,playerSymbol}) {
    const [gameBoard,SetgameBoard]=useState(initialGameBoard)
    function handlePlayerclick(rowIndex, colIndex){
        SetgameBoard((prevGameBoard) => {
        const updatedGameBoard=[...prevGameBoard.map(innerArray => [...innerArray])]
        updatedGameBoard[rowIndex][colIndex]=playerSymbol;
        return updatedGameBoard});
        onSelectBox();
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex} >
                <ol>
                    {row.map((PlayerSymbol,colIndex) => <li key={colIndex}><button onClick={() =>handlePlayerclick(rowIndex, colIndex)}>{PlayerSymbol}</button></li>)}
                </ol>
            </li>)}
        </ol>
    )
}