import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function nextActivePlayer(gameTurns) {
  let currentPlayer = "X"; // deriving the active player
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  } return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combo of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combo[0].row][combo[0].column];
    const secondSquare = gameBoard[combo[1].row][combo[1].column]; 
    const thirdSquare = gameBoard[combo[2].row][combo[2].column];

    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) winner=players[firstSquare];
  } return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(inner => [...inner])]; // derived state - deep copy!!!
  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col]=player;
  } return gameBoard;
}

function App() {
  // const [active_player, setActivePlayer] = useState('X');
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setTurns] = useState([]);

  const activePlayer = nextActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  const draw = gameTurns.length === 9 && !winner;
  function selectSquareHandler(rowI, colI) {
    // setActivePlayer((activePlayer) => (activePlayer === "X" ? "O" : "X"));
    setTurns((prevTurns) => {
      const currentPlayer = nextActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowI, col: colI }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function rematchHandler() {
    setTurns([]);
  }
  function nameChangeHandler(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onNameChange={nameChangeHandler}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onNameChange={nameChangeHandler} />
        </ol>
        {(winner || draw) && <GameOver winner={winner} onRematch={rematchHandler}/>}
        <GameBoard board={gameBoard} onSelectSquare={selectSquareHandler}/>
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
