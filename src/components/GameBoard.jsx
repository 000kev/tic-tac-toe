import { useState } from "react";

export default function GameBoard({onSelectSquare, board}) {
  // const [gameBoard, setGameBoard] = useState(initialBoard);
  // const selectHandler = (rowI, colI) => {
  //   setGameBoard((previous_state) => {
  //       const updated_board = [...previous_state.map(inner_array => [...inner_array])];
  //       updated_board[rowI][colI]=activeSymbol;
  //       return updated_board;
  //   });
  //   onSelectSquare();
  // };
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((unit, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={unit!==null}>
                  {unit}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
