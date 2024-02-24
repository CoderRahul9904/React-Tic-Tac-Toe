export default function GameBoard({onSelectBox, board}) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex} >
                <ol>
                    {row.map((PlayerSymbol,colIndex) => 
                    <li key={colIndex}><button onClick={() =>onSelectBox(colIndex, rowIndex)} disabled={PlayerSymbol ? true : false}>{PlayerSymbol}</button></li>)}
                </ol>
            </li>)}
        </ol>
    )
}